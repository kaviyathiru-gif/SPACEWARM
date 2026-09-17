package game

type Astronaut struct {
	Name           string  `json:"name"`
	Health         int     `json:"health"`
	Oxygen         int     `json:"oxygen"`
	ResearchPoints int     `json:"research_points"`
	PositionX      float64 `json:"position_x"`
	PositionY      float64 `json:"position_y"`
	Status         string  `json:"status"`
}

func NewAstronaut(name string) *Astronaut {
	return &Astronaut{
		Name:           name,
		Health:         100,
		Oxygen:         98,
		ResearchPoints: 156866,
		PositionX:      5456.0,
		PositionY:      188.0,
		Status:         "ACTIVE_MISSION",
	}
}
