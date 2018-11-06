import {Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PaymentmethodsComponent } from './admin/paymentmethods/paymentmethods.component';
import { AllnotificationComponent } from './allnotification/allnotification.component';

import { SingleRfpComponent } from './rfps/single-rfp/single-rfp.component';
import { PricingComponent } from './pricing/pricing.component';
// import {SidebarComponent} from "./sidebar/sidebar.component";
import { RfpComponent } from './rfps/rfp/rfp.component';
import { RegisteredComponent } from './registered/registered.component';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { LoginComponent } from './login/login.component';
import { ForgetPasswordComponent } from './admin/forget-password/forget-password.component';
import { AboutComponent } from './about/about.component';
import { StateRfpComponent } from './rfps/state-rfp/state-rfp.component';
import { CategoryRfpComponent } from './rfps/category-rfp/category-rfp.component';
import { AllCategoryComponent } from './all/all-category/all-category.component';
import { AllStateComponent } from './all/all-state/all-state.component';
import { DialogOverviewExample } from './residential/residential.component';
import { ProfileComponent } from './admin/profile/profile.component';
import { AuthGuard } from './_guards/auth.guard';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ChangedPasswordComponent } from './admin/changed-password/changed-password.component';
import { AdvanceSearchComponent } from './advance-search/advance-search.component';
import { RfpAsServiceComponent } from './rfp-as-service/rfp-as-service.component';
import { BlogComponent } from './blog/blog.component';
import { SingleblogComponent } from './singleblog/singleblog.component';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { WhatIsRfpComponent } from './what-is-rfp/what-is-rfp.component';
import { FeaturesComparisonComponent } from './features-comparison/features-comparison.component';
import { TermsComponent } from './terms/terms.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { PartnershipComponent } from './partnership/partnership.component';
import { WhyRfpgurusComponent } from './why-rfpgurus/why-rfpgurus.component';
import { OurTeamComponent } from './our-team/our-team.component';
import { WhatWeDoComponent } from './what-we-do/what-we-do.component';
import {AllAgenciesComponent} from './all/all-agencies/all-agencies.component';
// import { UnsubscribeComponent } from './unsubscribe/unsubscribe.component';
import { HistoryComponent } from './admin/history/history.component';
import {ResultsComponent} from './results/results.component';
import {AgencyRfpComponent} from './rfps/agency-rfp/agency-rfp.component';
import {BaseComponent} from './base/base.component';
import {AllRfpsService} from './all/all-rfps/all-rfps.service';
import {AllRfpsComponent} from './all/all-rfps/all-rfps.component';
import { AdminLayoutComponent } from './layouts/lyout/admin-layout.component';
import{AdminComponent} from './layouts/superadmin/admin-layout.component'
import { WatchlistComponent } from './watchlist/watchlist.component';

import {AuthLayoutComponent } from './layouts/auth/auth-layout.component'
export const AppRoutes: Routes = [
    {
        path: '',
        redirectTo: '/',
        pathMatch: 'full',
    },
   
    { path: '', component: HomeComponent },
  
   
   
   
    
   
    {
        path: 'activateaccount/:query1',
        component: AuthenticateComponent
    },
    {
        path: '',
        component: AdminComponent,
        children: [
            { path: 'purchase-history', component: HistoryComponent, canActivate: [AuthGuard] },
    { path: 'change-password', component: ChangedPasswordComponent, canActivate: [AuthGuard] },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: 'payment', component: PaymentmethodsComponent, canActivate: [AuthGuard] },


        ]
    }, 

   
   
    {
        path: '',
        component: AdminLayoutComponent,
        children: [
            { path: 'find-bids', component: BaseComponent },
            { path: 'watchlist', component: WatchlistComponent },
            // { path: 'find-bids',component:RfpComponent},
            { path: 'rfp/:query', component: SingleRfpComponent },
            { path: 'searched-data', component: ResultsComponent},
            { path: 'latest-rfp', component: AllRfpsComponent},
            
            { path: 'category', component: CategoryRfpComponent },
            { path: 'state', component: StateRfpComponent },
            { path: 'agency', component: AgencyRfpComponent},
        ]
    }, 
    
    
    {
        path: '',
        component: AuthLayoutComponent,
        children: [
            { path: 'base',component:BaseComponent},
            { path: 'login', component: LoginComponent },
            { path: 'rfp-as-service', component: RfpAsServiceComponent },
    { path: 'blog', component: BlogComponent },
    { path: 'All-notifications', component: AllnotificationComponent },
   
    { path: 'single-blog', component: SingleblogComponent },
    { path: 'how-it-works', component: HowItWorksComponent },
    { path: 'what-is-rfp', component: WhatIsRfpComponent },
    { path: 'features-comparison', component: FeaturesComparisonComponent },
    { path: 'terms', component: TermsComponent },
    { path: 'privacy-policy', component: PrivacyPolicyComponent },
    { path: 'partnership', component: PartnershipComponent },
    { path: 'why-rfpgurus', component: WhyRfpgurusComponent },
    { path: 'our-team', component: OurTeamComponent },
    { path: 'what-we-do', component: WhatWeDoComponent },
    { path: 'pricing', component: PricingComponent },
   
    { path: 'who-are-we', component: AboutComponent },
    { path: 'sign-up', component: RegisteredComponent },
    { path: 'all-category', component: AllCategoryComponent },
    { path: 'all-agencies', component: AllAgenciesComponent},
    { path: 'all-state', component: AllStateComponent },
    { path: 'faqs', component: DialogOverviewExample },
    { path: 'contact-us', component: ContactUsComponent },
    { path: 'advanced-search', component: AdvanceSearchComponent },
   
    {
        path: 'forgetpassword/:query2',
        component: ForgetPasswordComponent
    },
        ]
    }, 
];