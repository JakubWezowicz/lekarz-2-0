package main

import (
	"fmt"
	"lekarz-2-0/handlers"
	"net/http"
	"os"
	"time"

	"github.com/go-chi/chi/middleware"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/cors"
	"github.com/golang-jwt/jwt"
)
const PORT = ":8000"

func generateJWT() (string, error) {
	secretKey := os.Getenv("SECRET_KEY")
    token := jwt.New(jwt.SigningMethodHS256)
    claims := token.Claims.(jwt.MapClaims)
    claims["authorized"] = true
    claims["client"] = "Elliot Forbes"
    claims["exp"] = time.Now().Add(time.Minute * 30).Unix()

    tokenString, err := token.SignedString([]byte(secretKey))
    if err != nil {
        err := fmt.Errorf("something went wrong: %s", err.Error())
        return "", err
    }

    return tokenString, nil
}

func main (){
	router := chi.NewRouter()
	router.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"https://*", "http://*"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: false,
		MaxAge:           300, // Maximum value not ignored by any of major browsers
	  }))
	  router.Use(middleware.Logger)
	router.Get("/doctors", handlers.HandleGetAllDoctors)
	router.Get("/doctors/{id}", handlers.HandleGetDoctor)
	router.Post("/visits", handlers.HandleCreateVisit)
	router.Get("/visits/{id}", handlers.HandleGetVisit)
	router.Delete("/visits/{id}", handlers.HandleDeleteVisit)
	fmt.Printf("Server is running on port %s", PORT)
	err := http.ListenAndServe(PORT, router)
	if err != nil {
		fmt.Println(err)
	}

}