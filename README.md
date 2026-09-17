# SPACEWARM 🚀🌌

> Real-time AR Astronaut Space Adventure & Telemetry Dashboard powered by Go, WebSockets, and Live NASA API Data.

`SPACEWARM` is an immersive, sci-fi augmented reality (AR) mission control and simulation engine. It streams live space telemetry, tracks Near-Earth Object (NEO) hazards, and monitors astronaut life support systems through a futuristic web-based HUD.

---

## ✨ Features

* **Live NASA Telemetry Integration:** Automatically connects to NASA's public NeoWs (Near Earth Object Web Service) API to sync real asteroid and particle tracking data.
* **Real-Time WebSockets:** Streams low-latency health, oxygen, spatial coordinates, and research points from the Go backend to the frontend HUD.
* **Sci-Fi AR HUD Interface:** Built with a terminal aesthetic featuring radar scanning animations, dynamic progress bars, and live connection status indicators.
* **Robust Go Backend Engine:** Powered by a concurrent ticker loop and lightweight HTTP/WebSocket architecture written in Go.

---

## 📁 Repository Structure

```text
spacewarm/
├── .github/
│   └── workflows/
│       └── ci.yml
├── cmd/
│   └── server/
│       └── main.go
├── internal/
│   ├── game/
│   │   ├── engine.go
│   │   ├── nasa_client.go
│   │   └── player.go
│   └── ws/
│       └── hub.go
├── static/
│   └── index.html
├── go.mod
└── README.md
