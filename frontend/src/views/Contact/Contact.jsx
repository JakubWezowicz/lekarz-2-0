import "./Contact.css";
const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Twoje zapytanie zostało wysłane do administracji");
  };
  return (
    <div className="contact">
      <header>
        <h1>Kontakt z Administracją</h1>
      </header>
      <main>
        <p>
          Witaj! Jeśli masz pytania, sugestie lub potrzebujesz pomocy z naszą
          aplikacją <b>Lekarz 2.0</b>, jesteśmy tutaj, aby Ci pomóc. Nasz zespół
          administracyjny stoi Ci do dyspozycji, aby zapewnić Ci jak najlepsze
          doświadczenie z naszą aplikacją. Skontaktuj się z nami poprzez jedno z
          poniższych możliwości:
        </p>
        <ul>
          <li>
            <b>Telefon:</b> +48 123 456 789
          </li>
          <li>
            <b>Email:</b>{" "}
            <a href="mailto:lekarz2.0@gmail.com">lekarz2.0@gmail.com</a>
          </li>
          <li>
            <a href="">
              <b>Formularz Kontaktowy:</b>
            </a>
          </li>
        </ul>
        <form className="contactForm" onSubmit={handleSubmit}>
          <input type="text" placeholder="Podaj nazwe uzytkownika" required />
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            placeholder="Podaj treść pytania"
            required
          ></textarea>
          <input type="submit" value="Wyślij zapytanie" />
        </form>
      </main>
    </div>
  );
};

export default Contact;
