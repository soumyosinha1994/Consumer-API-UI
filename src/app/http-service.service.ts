import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {
 apiURL="https://localhost:7197/";
http=inject(HttpClient);
  constructor() { }
    getAuthToken(url:string,clientId:string,clientSecret:string){
    return this.http.post<{ authToken: string }>(this.apiURL + 'api/AuthToken/GetAuthToken', {
      url: url,
      clientId: clientId,
      clientSecret: clientSecret
    });
   }

   getConsumerFields(contentId: string) {
    const token = localStorage.getItem('authToken');
    console.log("Token in service:", token);

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<any>(
      `${this.apiURL}api/Consumer/${contentId}/fields`,
      { headers }
    );
  }

  getConsumerContentTypeGroups(contentId: string) {
    const token = localStorage.getItem('authToken');
    console.log("Token in service:", token);

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<any>(
      `${this.apiURL}api/Consumer/${contentId}/fields`,
      { headers }
    );
  }
// ================= Content Type Groups =================
  getContentTypeGroups(
    operation: string,
    offset: number,
    pageSize: number
  ) {
    const token = localStorage.getItem('authToken');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<any>(
      `${this.apiURL}content-type-groups`,
      {
        headers,
        params: {
          operation,
          offset,
          pageSize,
        },
      }
    );
  }

  // =========================
  // Get Connections
  // =========================
  getConnections(connectionId: string = '') {
    const token = localStorage.getItem('authToken');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<any>(
      `${this.apiURL}get-connection`,
      {
        headers,
        params: connectionId ? { connectionId } : {},
      }
    );
  }

  // =========================
// Add Connection
// =========================
addConnection(payload: any) {
  const token = localStorage.getItem('authToken');

  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`,
  });

  return this.http.post<any>(
    `${this.apiURL}add-connection`,
    payload,
    { headers }
  );
}

// =========================
// Delete Connection
// =========================
deleteConnection(connectionId: string) {
  const token = localStorage.getItem('authToken');

  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`,
  });

  return this.http.delete<any>(
    `${this.apiURL}delete-connection`,
    {
      headers,
      params: { connectionId },
    }
  );
}

}
