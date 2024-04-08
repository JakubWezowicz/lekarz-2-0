package handlers

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/go-chi/chi/v5"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Doctor struct {
	ID        primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Name string `json:"name,omitempty" bson:"name,omitempty"`
	Surname string `json:"surname,omitempty" bson:"surname,omitempty"`
	Specialization string `json:"specialization,omitempty" bson:"specialization,omitempty"`
	City string `json:"city,omitempty" bson:"city,omitempty"`
}

type NewVisit struct {
	PatientId string `json:"patientId,omitempty" bson:"patientId,omitempty"`
	DoctorId string `json:"doctorId,omitempty" bson:"doctorId,omitempty"`
	VisitDate string `json:"visitDate,omitempty" bson:"visitDate,omitempty"`
}

type Visit struct {
	ID        primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	PatientId string `json:"patientId,omitempty" bson:"patientId,omitempty"`
	DoctorId string `json:"doctorId,omitempty" bson:"doctorId,omitempty"`
	CreatedDate time.Time `json:"createdDate,omitempty" bson:"createdDate,omitempty"`
	VisitDate time.Time `json:"visitDate,omitempty" bson:"visitDate,omitempty"`
}

var client *mongo.Client
var ctx context.Context



func loadEnv() (string, error) {
	err := godotenv.Load()
	if err != nil {
		return "", err
	}
	DB_URI := os.Getenv("DB_URI")
	return DB_URI, nil
}

func connectDB(ctx context.Context) (*mongo.Client, error) {
	DB_URI, err := loadEnv()
	if err != nil {
		return nil, err
	}
	client, err := mongo.Connect(ctx, options.Client().ApplyURI(DB_URI))
	if err != nil {
		return nil, err
	}
	return client, nil
}

func init() {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	var err error
	client, err = connectDB(ctx)
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}
}

func HandleGetAllDoctors  (w http.ResponseWriter, r *http.Request){
	// get doctors
	doctorsCollection := client.Database("lekarz-2-0").Collection("doctors")
	// get all doctors
	cursor, err := doctorsCollection.Find(ctx, primitive.D{{}})
	if err != nil {
		fmt.Fprint(w, err)
		return
	}
	defer cursor.Close(ctx)
	// iterate over the cursor
	var doctors []Doctor
	for cursor.Next(ctx) {
		var doctor Doctor
		cursor.Decode(&doctor)
		doctors = append(doctors, doctor)
	}
	json, err := json.Marshal(doctors)
	if err != nil {
		fmt.Fprint(w, err)
		return
	}
	fmt.Fprint(w, string(json))
	// close connection
}

func HandleCreateVisit (w http.ResponseWriter, r *http.Request){
	// get body from http request
	var newVisit NewVisit
	err := json.NewDecoder(r.Body).Decode(&newVisit)
	if err != nil {
		fmt.Fprint(w, err)
		return
	}
    // Sprawdzenie czy wizyta zawiera datę
    if newVisit.VisitDate == "" {
        http.Error(w, "Missing visit date", http.StatusBadRequest)
        return
    }
	fmt.Println(newVisit)
    // Parsowanie czasu z formatu tekstowego na obiekt time.Time
    visitDate, err := time.Parse("2006-01-02T15:04:05Z07:00", newVisit.VisitDate)
    if err != nil {
        http.Error(w, "Invalid visit date format", http.StatusBadRequest)
        return
    }
	// post visit
	visitsCollection := client.Database("lekarz-2-0").Collection("visits")
	visit := bson.M{
		"patientId": newVisit.PatientId,
		"doctorId": newVisit.DoctorId,
		"createdDate": time.Now(),
		"visitDate": visitDate,
	}
	_, err = visitsCollection.InsertOne(ctx, visit)
	if err != nil {
		fmt.Fprint(w, err)
		return
	}
	json, _ := json.Marshal("Visit created")
		
	fmt.Fprint(w, string(json))
}

func HandleGetVisit (w http.ResponseWriter, r *http.Request){
	// get id from url
	id := chi.URLParam(r, "id")
	// connection mongodb

	// get visit
	visitsCollection := client.Database("lekarz-2-0").Collection("visits")
	visits := []Visit{}
	cursor, err := visitsCollection.Find(ctx, bson.M{"patientId": id})
	if err != nil {
		fmt.Fprint(w, err)
		return
	}
	defer cursor.Close(ctx)
	// iterate over the cursor
	for cursor.Next(ctx) {
		var visit Visit
		cursor.Decode(&visit)
		visits = append(visits, visit)
	}
	json, err := json.Marshal(visits)
	if err != nil {
		fmt.Fprint(w, err)
		return
	}
	fmt.Fprint(w, string(json))
}

func HandleGetDoctor (w http.ResponseWriter, r *http.Request){
	// get id from url
	id := chi.URLParam(r, "id")
	fmt.Println(id)
	// connection mongodb

	// get doctor
	doctorsCollection := client.Database("lekarz-2-0").Collection("doctors")
	doctor := Doctor{}
	// convert id to ObjectID
	objID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		fmt.Fprint(w, err)
		return
	}
	err = doctorsCollection.FindOne(ctx, bson.M{"_id": objID}).Decode(&doctor)
	if err != nil {
		fmt.Fprint(w, err)
		return
	}
	json, err := json.Marshal(doctor)
	if err != nil {
		fmt.Fprint(w, err)
		return
	}
	fmt.Fprint(w, string(json))
}

func HandleDeleteVisit (w http.ResponseWriter, r *http.Request){
	// get id from url
	id := chi.URLParam(r, "id")
	// connection mongodb

	// delete visit
	visitsCollection := client.Database("lekarz-2-0").Collection("visits")
	// convert id to ObjectID
	objID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		fmt.Fprint(w, err)
		return
	}
	_, err = visitsCollection.DeleteOne(ctx, bson.M{"_id": objID})
	if err != nil {
		fmt.Fprint(w, err)
		return
	}
	json, _ := json.Marshal("Visit deleted")
		
	fmt.Fprint(w, string(json))
}