import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { UserService } from '../services/user-service.service';
import { FooterComponent } from "./components/footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  constructor(private userService: UserService, private router: Router) {}
  ngOnInit(): void {
    const token = localStorage.getItem('authToken');
    if (token) {
      this.userService.setUserEmail(localStorage.getItem('userEmail'));
      this.router.navigate(['/weather']);
    }
  }
}
