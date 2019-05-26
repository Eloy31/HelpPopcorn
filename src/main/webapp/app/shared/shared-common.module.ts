import { NgModule } from '@angular/core';

import { HelpPopcornSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [HelpPopcornSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [HelpPopcornSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class HelpPopcornSharedCommonModule {}
