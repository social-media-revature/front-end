import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './modules/angular-material.module';
import { HttpClientModule } from '@angular/common/http';
import { PostFeedPageComponent } from './components/post-feed-page/post-feed-page.component';
import { PostComponent } from './components/post/post.component';
import { CommentComponent } from './components/comment/comment.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { UserInitialsPipe } from './pipes/user-initials.pipe';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BookmarkComponent } from './components/bookmark/bookmark.component';
import { LikeComponent } from './components/like/like.component';
import { GetProfileComponent } from './components/profile-get/get-profile.component';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { PipesModule } from './modules/pipes.module';
import { ObscenityPipe } from './pipes/obscenity.pipe';
import { GroupService } from './services/group.service';
import { GroupComponent } from './group/group.component';
import { AllGroupsComponent } from './all-groups/all-groups.component';
import { EditGroupComponent } from './components/edit-group/edit-group.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PostFeedPageComponent,
    PostComponent,
    CommentComponent,
    UserCardComponent,
    NavbarComponent,
    UserInitialsPipe,
    BookmarkComponent,
    LikeComponent,
    GetProfileComponent,
    ProfileEditComponent,
    ResetPasswordComponent,
    AllGroupsComponent,
    GroupComponent,
    EditGroupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FormsModule,
    PipesModule
  ],
  providers: [ ObscenityPipe, GroupService],
  bootstrap: [AppComponent]
})
export class AppModule { }
