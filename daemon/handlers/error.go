package handlers

type ErrorResponse struct {
	ErrorType  string `json:"error"`
	Message    string `json:"message"`
	StatusCode int    `json:"status_code"`
}
