import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './modules/about/about.component';
import { LaunchpadComponent } from './modules/launchpad/launchpad.component';
import { HomeComponent } from './modules/home/home.component';
import { DropsComponent } from './modules/drops/drops.component';
import { FaqComponent } from './modules/faq/faq.component';
import { ProfileComponent } from './modules/profile/profile.component';
import { DAOComponent } from './modules/dao/dao.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { AuthGuard } from './service/auth.guard';
import { SuicideGangComponent } from './modules/drops/suicide-gang/suicide-gang.component';
import { PaulChenardComponent } from './modules/drops/paul-chenard/paul-chenard.component';
import { NewCollectionComponent } from './modules/new-collection/new-collection.component';
import { CollectionDetailsComponent } from './modules/collection-details/collection-details.component';
import { CollectionGuard } from './service/collection.guard';
import { MetaVenturesComponent } from './modules/meta-ventures/meta-ventures.component';
import { OriginalsComponent } from './modules/drops/originals/originals.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'launchpad', component: LaunchpadComponent },
  { path: 'collections', component: DropsComponent },
  { path: 'collections/originals/:collectionId', component: OriginalsComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'meta-ventures', component: MetaVenturesComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'new-collection', component: NewCollectionComponent, canActivate: [AuthGuard, CollectionGuard] },
  { path: 'dao', component: DAOComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'my-collections/:collectionId', component: CollectionDetailsComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
