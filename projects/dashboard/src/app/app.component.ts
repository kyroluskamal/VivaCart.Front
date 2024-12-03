import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RendererService } from 'kyrolus-sous-material';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  providers: [RendererService],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'dashboard';
}
