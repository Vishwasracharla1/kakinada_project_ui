// // API Configuration
// export const API_CONFIG = {
//   // Base URL for API requests
//   BASE_URL: process.env.REACT_APP_API_BASE_URL || 'https://api.example.com',
  
//   // API Endpoints
//   ENDPOINTS: {
//     ANPR: {
//       READ: '/api/anpr/read',
//       // Add other ANPR endpoints here
//     },
//     // Add other API endpoints here
//   },
  
//   // Get full URL for an endpoint
//   getUrl: (endpoint: string) => {
//     return `${API_CONFIG.BASE_URL}${endpoint}`;
//   }
// };

// // Auth configuration
// export const AUTH_CONFIG = {
//   // Get token from environment variable or use a default for development
//   // In production, this should always come from environment variables
//   TOKEN: process.env.REACT_APP_API_TOKEN || 'your-default-dev-token',
// };



// // REACT_APP_API_BASE_URL=https://ig.gov-cloud.ai/pi-cohorts-service-dbaas;
// // REACT_APP_API_TOKEN=eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI3Ny1NUVdFRTNHZE5adGlsWU5IYmpsa2dVSkpaWUJWVmN1UmFZdHl5ejFjIn0.eyJleHAiOjE3NTk1MjM5OTYsImlhdCI6MTc1OTQ4Nzk5NiwianRpIjoiMTFiNGIyZTAtMGI5YS00YWJiLTljOTgtMWI1OTY0MDdhZGIzIiwiaXNzIjoiaHR0cDovL2tleWNsb2FrLXNlcnZpY2Uua2V5Y2xvYWsuc3ZjLmNsdXN0ZXIubG9jYWw6ODA4MC9yZWFsbXMvbWFzdGVyIiwiYXVkIjpbIkhPTEFDUkFDWV9tb2JpdXMiLCJhY2NvdW50Il0sInN1YiI6ImY3MWYzNTkzLWE2N2EtNDBiYy1hMTFhLTlhNDQ2NjhiNDEwZCIsInR5cCI6IkJlYXJlciIsImF6cCI6IkJPTFRaTUFOTl9CT1RfbW9iaXVzIiwic2lkIjoiM2Q5NmNlNTUtMWI1Yi00MzU3LThlZjItZDA3YjJhYzM2MjZmIiwiYWNyIjoiMSIsInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJkZWZhdWx0LXJvbGVzLW1hc3RlciIsIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJIT0xBQ1JBQ1lfbW9iaXVzIjp7InJvbGVzIjpbIkhPTEFDUkFDWV9VU0VSIl19LCJCT0xUWk1BTk5fQk9UX21vYml1cyI6eyJyb2xlcyI6WyJCT0xUWk1BTk5fQk9UX1VTRVIiXX0sImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoicHJvZmlsZSBlbWFpbCIsInJlcXVlc3RlclR5cGUiOiJURU5BTlQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6ImtzYW14cCBrc2FteHAiLCJ0ZW5hbnRJZCI6ImY3MWYzNTkzLWE2N2EtNDBiYy1hMTFhLTlhNDQ2NjhiNDEwZCIsInBsYXRmb3JtSWQiOiJtb2JpdXMiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJwYXNzd29yZF90ZW5hbnRfa3NhbXhwQG1vYml1c2R0YWFzLmFpIiwiZ2l2ZW5fbmFtZSI6ImtzYW14cCIsImZhbWlseV9uYW1lIjoia3NhbXhwIiwiZW1haWwiOiJwYXNzd29yZF90ZW5hbnRfa3NhbXhwQG1vYml1c2R0YWFzLmFpIn0.Wg5mM_tU9R7y3iBqztxkDcA_n_sM-AAcQj_YqqUwMufdVRZraCIpflOmpdRlf88ZGKfXRmt43O66fqu2z9-fw33z3EKrt-CCDFY1b0PAJGjTLGQfdz4YGyaezA177reqtac9HGs5cCxpzjDkKcVHmm-PSo_RR8Nsp7yqUzdrSZ4okTRYMNAsa4nWdww1UnkG8cKYn3UgnjXzHNo8vLsx4n9XlFQr-iBn5CWf_pWm4cPvowW4jcMosT-yVE0M5ayCLLrAsMKOeJJc7kwT-XPYK_3jwdh5MF0M3yCn2-U_PBFeH7kDQIdbwHSfDf5eatpSBXLYUGkGqR0ehOChG7pK8Q;