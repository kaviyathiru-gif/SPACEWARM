package game

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"
)

type NASAClient struct {
	APIKey string
}

type NEOFeedResponse struct {
	ElementCount     int `json:"element_count"`
	NearEarthObjects map[string][]struct {
		ID                string  `json:"id"`
		Name              string  `json:"name"`
		AbsoluteMag       float64 `json:"absolute_magnitude_h"`
		EstimatedDiameter struct {
			Kilometers struct {
				Min float64 `json:"estimated_diameter_min"`
				Max float64 `json:"estimated_diameter_max"`
			} `json:"kilometers"`
		} `json:"estimated_diameter"`
		IsHazardous bool `json:"is_potentially_hazardous_asteroid"`
	} `json:"near_earth_objects"`
}

func NewNASAClient(apiKey string) *NASAClient {
	if apiKey == "" {
		apiKey = "DEMO_KEY" // Fallback to public NASA demo key
	}
	return &NASAClient{APIKey: apiKey}
}

func (nc *NASAClient) FetchRealAsteroidData() (string, error) {
	today := time.Now().Format("2006-01-02")
	url := fmt.Sprintf("https://api.nasa.gov/neo/rest/v1/feed?start_date=%s&end_date=%s&api_key=%s", today, today, nc.APIKey)

	resp, err := http.Get(url)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	var result NEOFeedResponse
	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		return "", err
	}

	return fmt.Sprintf("Synced %d real NEO particle/hazard tracks from NASA API for %s", result.ElementCount, today), nil
}
