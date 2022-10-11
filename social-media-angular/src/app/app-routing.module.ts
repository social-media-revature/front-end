import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GetProfileComponent } from './components/profile-get/get-profile.component';
import { LoginComponent } from './components/login/login.component';
import { PostFeedPageComponent } from './components/post-feed-page/post-feed-page.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';

const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "post-feed", component: PostFeedPageComponent},
  { path: "get-profile/:pid", component: GetProfileComponent},
  { path: "profile-edit/:pid", component: ProfileEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
