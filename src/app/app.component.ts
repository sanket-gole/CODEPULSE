import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./core/components/navbar/navbar.component";
import { ImageSelectorComponent } from "./shared/components/image-selector/image-selector.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, ImageSelectorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CodePulse';
}
