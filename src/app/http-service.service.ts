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

   // ================= Content Fields =================
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

  // ================= Content Type Groups By Id =================
  getContentTypeGroupsById(
    operation: string,
    contentTypeGroupId: string
  ) {
    const token = localStorage.getItem('authToken');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<any>(
      `${this.apiURL}content-type-groups-Id/${contentTypeGroupId}`,
      {
        headers,
        params: {
          operation,
        },
      }
    );
  }

  // ================= Content Type =================
  getContentType(
    operation: string,
    contentTypeId: string
  ) {
    const token = localStorage.getItem('authToken');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<any>(
      `${this.apiURL}content-types/${contentTypeId}`,
      {
        headers,
        params: {
          operation,
        },
      }
    );
  }

  // ================= Data Objects Queries =================
  dataObjectQueries(
    offset: number,
    pageSize: number
  ) {
    const token = localStorage.getItem('authToken');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<any>(
      `${this.apiURL}data-objects-queries`,
      {
        headers,
        params: {
          offset,
          pageSize,
        },
      }
    );
  }

  // ================= Data Data Objects Queries By Id =================
  getDataObjectsQueriesById(
    queryId: string
  ) {
    const token = localStorage.getItem('authToken');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<any>(
      `${this.apiURL}data-objects-queries-by-id/${queryId}`,
      {
        headers
      }
    );
  }

  // ================= Execute Data Objects Queries =================
  executeDataObjectsQueries(payload: any,
    queryId: string,
    offset: number,
    pageSize: number
  ) {
    const token = localStorage.getItem('authToken');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post<any>(
      `${this.apiURL}execute-data-objects-queries/${queryId}`,
      payload,
      {
        headers,
        params: {
          offset,
          pageSize,
        },
      }
    );
  }

  // ================= Standard Search =================
  standardSearch(payload: any,
    offset: number,
    pageSize: number
  ) {
    const token = localStorage.getItem('authToken');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post<any>(
      `${this.apiURL}standard-search`,
      payload,
      {
        headers,
        params: {
          offset,
          pageSize,
        },
      }
    );
  }

  // ================= Get Integrations =================
  getIntegrations(
  integrationId?: string,
  pageSize?: number,
  cursor?: string
) {
  const token = localStorage.getItem('authToken');

  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`,
  });


  const url = `${this.apiURL}system-integrations`;


  const params: any = {};
  if (pageSize !== undefined && pageSize !== 0) params.pageSize = pageSize;
  if (cursor !== undefined && cursor !== '') params.cursor = cursor;
  if (integrationId !== undefined && integrationId !== '') params.integrationId = integrationId;

  return this.http.get<any>(url, {
    headers,
    params,
  });
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
