import { UtilityService } from './services/utility.service';
import { ChangeDetectorRef, Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { LoaderService } from './services/loader.service';
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.scss' ]
})
export class AppComponent {
	public currentYear = new Date().getFullYear();
	constructor(private primengConfig: PrimeNGConfig, public loader: LoaderService, private cdRef: ChangeDetectorRef, public UtilityService:UtilityService) {}
	ngOnInit() {
		this.primengConfig.ripple = true;
	}
	ngAfterContentChecked() {
		this.cdRef.detectChanges();
	}
}
