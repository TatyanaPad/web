package main

import (
	"encoding/json"
	"fmt"
	"html/template"
	"log"
	"map/data"
	"net/http"
	"strings"

	"github.com/gorilla/mux"
)

func homePage(w http.ResponseWriter, _ *http.Request) {
	u := data.Routes{}
	u.GetAll()
	t, _ := template.ParseFiles("LK/main.html")
	t.Execute(w, u)
}

func about(w http.ResponseWriter, _ *http.Request) {
	t, _ := template.ParseFiles("LK/about.html")
	t.Execute(w, nil)
}

func maps(w http.ResponseWriter, _ *http.Request) {
	t, _ := template.ParseFiles("LK/map.html")
	t.Execute(w, nil)
}

func route(w http.ResponseWriter, r *http.Request) {
	coordinations := strings.Split(r.URL.Query().Get("data"), "|")
	u := data.Location{
		Start: coordinations[0],
		Stop:  coordinations[1],
	}

	fmt.Println(len(coordinations))

	t, _ := template.ParseFiles("LK/route.html")
	t.Execute(w, u)
}

func orders(w http.ResponseWriter, r *http.Request) {
	t, _ := template.ParseFiles("LK/order.html")
	t.Execute(w, nil)
}

func getRoutests(w http.ResponseWriter, r *http.Request) {
	u := data.Routes{}
	u.GetAll()

	js, _ := json.Marshal(u)
	w.Header().Set("Content-Type", "application/json")
	w.Write(js)
}

func run() {
	http.Handle("/style/",
		http.StripPrefix("/style/",
			http.FileServer(http.Dir("./style/"))))
	http.Handle("/LK/",
		http.StripPrefix("/LK/",
			http.FileServer(http.Dir("./LK/"))))

	rout := mux.NewRouter()
	rout.HandleFunc("/", homePage).Methods("GET")
	rout.HandleFunc("/about/", about).Methods("GET")
	rout.HandleFunc("/map/", maps).Methods("GET")
	rout.HandleFunc("/route/", route).Methods("GET")
	rout.HandleFunc("/order/", orders).Methods("GET")

	// api
	rout.HandleFunc("/api/routes/", getRoutests).Methods("GET")
	rout.HandleFunc("/api/guides/", getRoutests).Methods("GET")

	http.Handle("/", rout) // перенаправление на роутер
	http.ListenAndServe(":8080", nil)
}

func main() {
	log.Println("SERVER START")
	run()
}
