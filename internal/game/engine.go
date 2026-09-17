package game

import (
	"encoding/json"
	"log"
	"math/rand"
	"time"
)

type GameEngine struct {
	Astronaut  *Astronaut
	NASAClient *NASAClient
	Broadcast  chan []byte
	isrunning  bool
}

func NewGameEngine(broadcastChan chan []byte, nasaApiKey string) *GameEngine {
	return &GameEngine{
		Astronaut:  NewAstronaut("Commander Suruthi"),
		NASAClient: NewNASAClient(nasaApiKey),
		Broadcast:  broadcastChan,
		isrunning:  true,
	}
}

func (g *GameEngine) Start() {
	// Fetch real NASA particle and asteroid telemetry on startup
	if statusMsg, err := g.NASAClient.FetchRealAsteroidData(); err == nil {
		log.Println("🛰️ SPACEWARM NASA Telemetry Synced:", statusMsg)
	} else {
		log.Println("⚠️ Using simulated space particle telemetry fallback:", err)
	}

	ticker := time.NewTicker(2 * time.Second)
	for g.isrunning {
		<-ticker.C
		
		// Simulate AR HUD updates and life support telemetry fluctuations
		g.Astronaut.Oxygen = 90 + rand.Intn(10)
		g.Astronaut.ResearchPoints += rand.Intn(10)

		data, err := json.Marshal(g.Astronaut)
		if err == nil {
			g.Broadcast <- data
		}
	}
}

func (g *GameEngine) Stop() {
	g.isrunning = false
}
