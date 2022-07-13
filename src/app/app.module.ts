import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './modules/about/about.component';
import { LaunchpadComponent } from './modules/launchpad/launchpad.component';
import { DropsComponent } from './modules/drops/drops.component';
import { HomeComponent } from './modules/home/home.component';
import { DAOComponent } from './modules/dao/dao.component';
// import { SuicideGangComponent } from './modules/drops/suicide-gang/suicide-gang.component';
// import { PaulChenardComponent } from './modules/drops/paul-chenard/paul-chenard.component';

import { environment } from '../environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { AngularFireModule } from '@angular/fire/compat';
import { TypeDeleteComponent } from './common/type-delete/type-delete.component';
import {
  RECAPTCHA_SETTINGS,
  RecaptchaModule,
  RecaptchaSettings,
} from 'ng-recaptcha';
import { FooterComponent } from './common/footer/footer.component';
import { NewFooterComponent } from './common/new-footer/new-footer.component';
import { FaqComponent } from './modules/faq/faq.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidenavListComponent } from './modules/sidenav-list/sidenav-list.component';
import { HeaderComponent } from './modules/header/header.component';
import { NewHeaderComponent } from './modules/new-header/new-header.component';
import { MaterialModule } from './material/material.module';
import { LayoutComponent } from './modules/layout/layout.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { SnackBarComponent } from './common/snack-bar/snack-bar.component';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { AuthGuard } from './service/auth.guard';
import { AuthService } from './service/auth.service';
import { UserService } from './service/user.service';
import { ProfileComponent } from './modules/profile/profile.component';
import { AuthModalComponent } from './common/auth-modal/auth-modal.component';
import { DialogComponent } from './common/dialog/dialog.component';
import { UploaderComponent } from './common/uploader/uploader.component';
import { UploadTaskComponent } from './common/upload-task/upload-task.component';
import { DropzoneDirective } from './dropzone.directive';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { HdWalletAdapterModule } from '@heavy-duty/wallet-adapter';
import { WalletSelectorComponent } from './common/wallet-selector/wallet-selector.component';
import { WalletStatusModalComponent } from './common/wallet-status-modal/wallet-status-modal.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { NewCollectionComponent } from './modules/new-collection/new-collection.component';
import { FullScreenLoaderComponent } from './common/full-screen-loader/full-screen-loader.component';
import { CollectionDetailsComponent } from './modules/collection-details/collection-details.component';
import { CollectionGuard } from './service/collection.guard';
import { MassUploaderComponent } from './common/mass-uploader/mass-uploader.component';
import { InitStoreModalComponent } from './modules/collection-details/init-store-modal/init-store-modal.component';
import { DeployStoreModalComponent } from './modules/collection-details/deploy-store-modal/deploy-store-modal.component';
import { MetaVenturesComponent } from './modules/meta-ventures/meta-ventures.component';
import { OriginalsComponent } from './modules/drops/originals/originals.component';
import { ImageLightboxComponent } from './common/image-lightbox/image-lightbox.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    DropzoneDirective,
    UploadTaskComponent,
    UploaderComponent,
    AppComponent,
    AboutComponent,
    LaunchpadComponent,
    DropsComponent,
    HomeComponent,
    // SuicideGangComponent,
    // PaulChenardComponent,
    TypeDeleteComponent,
    FooterComponent,
    FaqComponent,
    SidenavListComponent,
    HeaderComponent,
    LayoutComponent,
    SnackBarComponent,
    ProfileComponent,
    AuthModalComponent,
    DialogComponent,
    DAOComponent,
    WalletSelectorComponent,
    WalletStatusModalComponent,
    DashboardComponent,
    NewCollectionComponent,
    FullScreenLoaderComponent,
    CollectionDetailsComponent,
    MassUploaderComponent,
    InitStoreModalComponent,
    DeployStoreModalComponent,
    MetaVenturesComponent,
    OriginalsComponent,
    ImageLightboxComponent,
    NewHeaderComponent,
    NewFooterComponent,
  ],
  imports: [
    RouterModule,
    FlexLayoutModule,
    MaterialModule,
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    AngularFireModule.initializeApp(environment.firebase),
    HdWalletAdapterModule.forRoot({ autoConnect: false }),
    AngularFireDatabaseModule,
    FormsModule,
    ReactiveFormsModule,
    RecaptchaModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: environment.recaptchaToken,
      } as RecaptchaSettings,
    },
    AuthService,
    AuthGuard,
    UserService,
    CollectionGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
function Injectable() {
  throw new Error('Function not implemented.');
}
