import { Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { ConsumerFieldsComponent } from './component/consumer-fields/consumer-fields.component';
import { ConsumerContentTypeGroupsComponent } from './component/consumer-content-type-groups/consumer-content-type-groups.component';
import { GetConnectionsComponent } from './component/get-connections/get-connections.component';

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

];
