package main

import (
	"log"
	"net/http"
	"os"

	"spacewarm/internal/game"
	"spacewarm/internal/ws"
)

func main() {
	hub := ws.NewHub()
	go hub.Run()

	nasaKey := os.Getenv("NASA_API_KEY")
	engine := game.NewGameEngine(hub.Broadcast, nasaKey)
	go engine.Start()

	http.HandleFunc("/ws", hub.HandleConnections)
	http.Handle("/", http.FileServer(http.Dir("./static")))

	log.Println("🚀 SPACEWARM AR Mission Control Server started on :8080 with Live NASA Data Sync")
	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}
