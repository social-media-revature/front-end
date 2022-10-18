import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookmarkComponent } from './components/bookmark/bookmark.component';
import { LikeComponent } from './components/like/like.component';
import { LoginComponent } from './components/login/login.component';
import { PostFeedPageComponent } from './components/post-feed-page/post-feed-page.component';
import { RegisterComponent } from './components/register/register.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { AllGroupsComponent } from './components/all-groups/all-groups.component';
import { EditGroupComponent } from './components/edit-group/edit-group.component';
import { LoginComponent } from './components/login/login.component';
import { PostFeedPageComponent } from './components/post-feed-page/post-feed-page.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { EditProfileGuard } from './guards/edit-profile.guard';
import { AllGroupsComponent } from './all-groups/all-groups.component';
import { GroupComponent } from './group/group.component';
import { EditGroupComponent } from './components/edit-group/edit-group.component';

const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "post-feed", component: PostFeedPageComponent},
  { path: "bookmark", component: BookmarkComponent},
  { path: "like", component: LikeComponent}
  { path: "get-profile/:pid", component: GetProfileComponent},
  { path: "profile-edit/:pid", component: ProfileEditComponent, canActivate: [EditProfileGuard]},
  { path: "reset-password", component: ResetPasswordComponent},
  { path: "groups", component: AllGroupsComponent},
  { path: "app-group", component: GroupComponent},
  { path: "edit-group", component: EditGroupComponent
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
