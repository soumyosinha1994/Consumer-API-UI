import { Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { ConsumerFieldsComponent } from './component/consumer-fields/consumer-fields.component';
import { ConsumerContentTypeGroupsComponent } from './component/consumer-content-type-groups/consumer-content-type-groups.component';
import { GetConnectionsComponent } from './component/get-connections/get-connections.component';
import { ConsumerContentTypeGroupsByIdComponent } from './component/consumer-content-type-groups-by-id/consumer-content-type-groups-by-id.component';
import { ConsumerContentTypesComponent } from './component/consumer-content-types/consumer-content-types.component';
import { ConsumerDataObjectQueriesComponent } from './component/consumer-data-object-queries/consumer-data-object-queries.component';
import { ConsumerDataObjectQueriesByIdComponent } from './component/consumer-data-object-queries-by-id/consumer-data-object-queries-by-id.component';
import { ConsumerExecuteDataObjectQueriesComponent } from './component/consumer-execute-data-object-queries/consumer-execute-data-object-queries.component';
import { ConsumerStandardSearchComponent } from './component/consumer-standard-search/consumer-standard-search.component';
import { ConsumerSystemIntegrationsComponent } from './component/consumer-system-integrations/consumer-system-integrations.component';

export const routes: Routes = [
    {
        path:"",
        component:LoginComponent
    },

    {
        path:"login",
        component:LoginComponent,
    },
    {
        path:"consumer-fields",
        component:ConsumerFieldsComponent,
    },
    {
        path:"consumer-content-type-groups",
        component:ConsumerContentTypeGroupsComponent,
    },
    {
        path:"get-connections",
        component:GetConnectionsComponent,
    },
    {
        path:"consumer-content-type-groups-by-id",
        component:ConsumerContentTypeGroupsByIdComponent,
    },
    {
        path:"consumer-content-types",
        component:ConsumerContentTypesComponent,
    },
    {
        path:"consumer-data-object-queries",
        component:ConsumerDataObjectQueriesComponent,
    },
    {
        path:"consumer-data-object-queries-by-id",
        component:ConsumerDataObjectQueriesByIdComponent,
    },
    {
        path:"consumer-execute-data-object-queries",
        component:ConsumerExecuteDataObjectQueriesComponent,
    },
    {
        path:"consumer-standard-search",
        component:ConsumerStandardSearchComponent,
    },
    {
        path:"consumer-system-integrations",
        component:ConsumerSystemIntegrationsComponent,
    },

];
