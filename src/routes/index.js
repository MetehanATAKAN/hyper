import React from 'react';
import { Redirect } from 'react-router-dom';
import { Route } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';

// lazy load all the views

// auth
const Login = React.lazy(() => import('../pages/account/Login'));
const Logout = React.lazy(() => import('../pages/account/Logout'));
const Register = React.lazy(() => import('../pages/account/Register'));
const Confirm = React.lazy(() => import('../pages/account/Confirm'));
const ForgetPassword = React.lazy(() => import('../pages/account/ForgetPassword'));
const LockScreen = React.lazy(() => import('../pages/account/LockScreen'));
const ChangePassword = React.lazy(() => import('../pages/account/ChangePassword'));

const Login2 = React.lazy(() => import('../pages/account2/Login2'));
const Logout2 = React.lazy(() => import('../pages/account2/Logout2'));
const Register2 = React.lazy(() => import('../pages/account2/Register2'));
const Confirm2 = React.lazy(() => import('../pages/account2/Confirm2'));
const ForgetPassword2 = React.lazy(() => import('../pages/account2/ForgetPassword2'));
const LockScreen2 = React.lazy(() => import('../pages/account2/LockScreen2'));

// dashboard
const AnalyticsDashboard = React.lazy(() => import('../pages/dashboard/Analytics'));
const EcommerceDashboard = React.lazy(() => import('../pages/dashboard/Ecommerce'));
const CRMDashboard = React.lazy(() => import('../pages/dashboard/CRM'));
const ProjectDashboard = React.lazy(() => import('../pages/dashboard/Project'));

// apps
const CalendarApp = React.lazy(() => import('../pages/apps/Calendar/'));
const Projects = React.lazy(() => import('../pages/apps/Projects/'));
const ProjectDetail = React.lazy(() => import('../pages/apps/Projects/Detail/'));
const ProjectGannt = React.lazy(() => import('../pages/apps/Projects/Gantt/'));
const ProjectForm = React.lazy(() => import('../pages/apps/Projects/ProjectForm'));
// - chat
const ChatApp = React.lazy(() => import('../pages/apps/Chat/'));
// - ecommece pages
//
//const Marketing = React.lazy(() => import('../pages/apps/Marketing/VisitMix'));
const Marketing = React.lazy(() => import('../pages/apps/Marketing/VisitMix/VisitMix'));
const ProductPA = React.lazy(() => import('../pages/apps/Marketing/ProductPriorityAllocation/ProductPA'));

//MICRO TARGET
const MicroTarget = React.lazy(() => import('../pages/apps/Marketing/MicroTarget/index'));

//PREPLAN
const PrePlan = React.lazy(() => import('../pages/apps/Marketing/PrePlan'));
//CALENDAR(Marketing)
const CalendarM = React.lazy(() => import('../pages/apps/Marketing/VisitMix/Calendar/index'));
// TASK MANAGEMENT
const TargetOperatingModel = React.lazy(() => import('../pages/apps/TaskManagement/TaskManagementIndex'));

const ActionCheckList = React.lazy(() => import('../pages/apps/ActionCheckList/ActionCheckListIndex'));
// BUDGET
const Budget = React.lazy(() => import('../pages/apps/Budget/index'));
// TRAINING
const Training = React.lazy(() => import('../pages/apps/Training'));
const TrainingDetail = React.lazy(() => import('../pages/apps/Training/TrainingDetail'));
// GANTT
const Gantt = React.lazy(() => import('../pages/apps/Gantt/'));

// BROCHURE
const Brochure = React.lazy(() => import('../pages/apps/Brochure/'));
const BrochureTemplate = React.lazy(() => import('../pages/apps/Brochure/Template/index'));
const DesignTemplate = React.lazy(() => import('../pages/apps/Brochure/Template/DesignTemplate'));
const DesignDetails = React.lazy(() => import('../pages/apps/Brochure/Template/Details'));
const TemplateDetails = React.lazy(() => import('../components/TemplateDetails'));
const BrochureContent = React.lazy(() => import('../pages/apps/Brochure/Content/index'));
const BrochureTranslate = React.lazy(() => import('../pages/apps/Brochure/Translate/index'));
const PageGallery = React.lazy(() => import('../pages/apps/Brochure/PageGallery/index'));
const BrochureNeed = React.lazy(() => import('../pages/apps/Brochure/Need/index'));
const BrochureBenefits = React.lazy(() => import('../pages/apps/Brochure/Benefits/index'));
const Disadvantages = React.lazy(() => import('../pages/apps/Brochure/Disadvantages/index'));
const DisadvantagesDetails = React.lazy(() => import('../pages/apps/Brochure/Disadvantages/PageList/Details'));
const DisadvantePageListTemplate = React.lazy(() => import('../pages/apps/Brochure/Disadvantages/PageList/Template'));
const DisadvantagesDesign = React.lazy(() => import('../pages/apps/Brochure/Disadvantages/Templates/Template'));
const DisadvantagesPageGalleryDetails = React.lazy(() =>
    import('../pages/apps/Brochure/Disadvantages/PageGallery/DetailsGallery')
);
const DisadvantePageGalleryTemplate = React.lazy(() =>
    import('../pages/apps/Brochure/Disadvantages/PageGallery/PageGalleryDesignTemplate')
);
//
const EcommerceProducts = React.lazy(() => import('../pages/apps/Ecommerce/Products'));
const ProductDetails = React.lazy(() => import('../pages/apps/Ecommerce/ProductDetails'));
const Orders = React.lazy(() => import('../pages/apps/Ecommerce/Orders'));
const OrderDetails = React.lazy(() => import('../pages/apps/Ecommerce/OrderDetails'));
const Customers = React.lazy(() => import('../pages/apps/Ecommerce/Customers'));
const Cart = React.lazy(() => import('../pages/apps/Ecommerce/Cart'));
const Checkout = React.lazy(() => import('../pages/apps/Ecommerce/Checkout/'));
const Sellers = React.lazy(() => import('../pages/apps/Ecommerce/Sellers'));

// Materials
const Materials = React.lazy(() => import('../pages/apps/Materials/Materials'));
const CompanyType = React.lazy(() => import('../pages/apps/Materials/CompanyType'));
const ConnectMaterial = React.lazy(() => import('../pages/apps/Materials/ConnectMaterials'));
// HR
const hrCorporate = React.lazy(() => import('../pages/apps/Hr/Corporate/index'));
const hrCompanyDepartmant = React.lazy(() => import('../pages/apps/Hr/Company/index'));

//Reconciliation
const reconciliation = React.lazy(() => import('../pages/apps/Reconciliation/index'));

//Passport of products
const passportOfProducts = React.lazy(() => import('../pages/apps/PassportOfProducts/index'));
const passportOfProductsPages = React.lazy(() => import('../pages/apps/PassportOfProducts/PromoSubject/Pages'));

// Competitor
const competitor = React.lazy(() => import('../pages/apps/Competitor/index'));
const formType = React.lazy(() => import('../pages/apps/FormType/index'));

// Survey
const survey = React.lazy(() => import('../pages/apps/Survey/index'));
const surveyDashboard = React.lazy(() => import('../pages/apps/Survey/MyBoard/index'));
const surveyAddQuestion = React.lazy(() => import('../pages/apps/Survey/Survey-Create/index'));
const surveySingleAnswer = React.lazy(() => import('../pages/apps/Survey/Survey-Create/SingleAnswer/index'));
const surveyMultiAnswer = React.lazy(() => import('../pages/apps/Survey/Survey-Create/MultipleAnswer/index'));
const surveyTextAnswer = React.lazy(() => import('../pages/apps/Survey/Survey-Create/TextAnswer/index'));

//CRM
const mmDataCheck = React.lazy(() => import('../pages/apps/CRM/MMDataCheck/index'));

// - ActivityLimitAndSettings
const ActivityLimitAndSettings = React.lazy(() => import('../pages/apps/ActivityLimitAndSettings/'));
// - email
const Inbox = React.lazy(() => import('../pages/apps/Email/Inbox'));
const EmailDetail = React.lazy(() => import('../pages/apps/Email/Detail'));
// - social
const SocialFeed = React.lazy(() => import('../pages/apps/SocialFeed/'));
// - tasks
const TaskList = React.lazy(() => import('../pages/apps/Tasks/List/'));
const TaskDetails = React.lazy(() => import('../pages/apps/Tasks/Details'));
const Kanban = React.lazy(() => import('../pages/apps/Tasks/Board/'));
// - file
const FileManager = React.lazy(() => import('../pages/apps/FileManager'));

// pages
const Profile = React.lazy(() => import('../pages/profile'));
const Profile2 = React.lazy(() => import('../pages/profile2'));
const ErrorPageNotFound = React.lazy(() => import('../pages/error/PageNotFound'));
const Error404 = React.lazy(() => import('../pages/error/Error404'));
const ErrorPageNotFoundAlt = React.lazy(() => import('../pages/error/PageNotFoundAlt'));
const ServerError = React.lazy(() => import('../pages/error/ServerError'));
// - other
const Invoice = React.lazy(() => import('../pages/other/Invoice'));
const FAQ = React.lazy(() => import('../pages/other/FAQ'));
const Pricing = React.lazy(() => import('../pages/other/Pricing'));
const Maintenance = React.lazy(() => import('../pages/other/Maintenance'));
const Starter = React.lazy(() => import('../pages/other/Starter'));
const PreLoader = React.lazy(() => import('../pages/other/PreLoader/'));
const Timeline = React.lazy(() => import('../pages/other/Timeline'));

const Landing = React.lazy(() => import('../pages/landing/'));

// uikit
const Accordions = React.lazy(() => import('../pages/uikit/Accordions'));
const Alerts = React.lazy(() => import('../pages/uikit/Alerts'));
const Avatars = React.lazy(() => import('../pages/uikit/Avatars'));
const Badges = React.lazy(() => import('../pages/uikit/Badges'));
const Breadcrumbs = React.lazy(() => import('../pages/uikit/Breadcrumb'));
const Buttons = React.lazy(() => import('../pages/uikit/Buttons'));
const Cards = React.lazy(() => import('../pages/uikit/Cards'));
const Carousels = React.lazy(() => import('../pages/uikit/Carousel'));
const Dropdowns = React.lazy(() => import('../pages/uikit/Dropdowns'));
const EmbedVideo = React.lazy(() => import('../pages/uikit/EmbedVideo'));
const Grid = React.lazy(() => import('../pages/uikit/Grid'));
const ListGroups = React.lazy(() => import('../pages/uikit/ListGroups'));
const Modals = React.lazy(() => import('../pages/uikit/Modals'));
const Notifications = React.lazy(() => import('../pages/uikit/Notifications'));
const Offcanvases = React.lazy(() => import('../pages/uikit/Offcanvas'));
const Paginations = React.lazy(() => import('../pages/uikit/Paginations'));
const Popovers = React.lazy(() => import('../pages/uikit/Popovers'));
const Progress = React.lazy(() => import('../pages/uikit/Progress'));
const Ribbons = React.lazy(() => import('../pages/uikit/Ribbons'));
const Spinners = React.lazy(() => import('../pages/uikit/Spinners'));
const Tabs = React.lazy(() => import('../pages/uikit/Tabs'));
const Tooltips = React.lazy(() => import('../pages/uikit/Tooltips'));
const Typography = React.lazy(() => import('../pages/uikit/Typography'));
const DragDrop = React.lazy(() => import('../pages/uikit/DragDrop'));
const RangeSliders = React.lazy(() => import('../pages/uikit/RangeSliders'));
const Ratings = React.lazy(() => import('../pages/uikit/Ratings'));

// icons
const Dripicons = React.lazy(() => import('../pages/uikit/Dripicons'));
const MDIIcons = React.lazy(() => import('../pages/uikit/MDIIcons'));
const Unicons = React.lazy(() => import('../pages/uikit/Unicons'));

// forms
const BasicForms = React.lazy(() => import('../pages/forms/Basic'));
const FormAdvanced = React.lazy(() => import('../pages/forms/Advanced'));
const FormValidation = React.lazy(() => import('../pages/forms/Validation'));
const FormWizard = React.lazy(() => import('../pages/forms/Wizard'));
const FileUpload = React.lazy(() => import('../pages/forms/FileUpload'));
const Editors = React.lazy(() => import('../pages/forms/Editors'));

// charts
const ApexChart = React.lazy(() => import('../pages/charts/Apex'));
const BriteChart = React.lazy(() => import('../pages/charts/Brite'));
const ChartJs = React.lazy(() => import('../pages/charts/ChartJs'));

// tables
const BasicTables = React.lazy(() => import('../pages/tables/Basic'));
const AdvancedTables = React.lazy(() => import('../pages/tables/Advanced'));

// widgets
const Widgets = React.lazy(() => import('../pages/uikit/Widgets'));

// maps
const GoogleMaps = React.lazy(() => import('../pages/maps/GoogleMaps'));
const VectorMaps = React.lazy(() => import('../pages/maps/VectorMaps'));

// country
const Country = React.lazy(() => import('../pages/apps/Country/Country'));

// Settings
const Settings = React.lazy(() => import('../pages/apps/Settings'));

// Promo Campaing
const PromoCampaing = React.lazy(() => import('../pages/apps/PromoCampaing'));

// Table Settings
const TableSettings = React.lazy(() => import('../pages/apps/Settings/TableSettings/index'));

// Budgeting
const Budgeting = React.lazy(() => import('../pages/apps/Budgeting'));
// Visit Content
const VisitContent = React.lazy(() => import('../pages/apps/VisitContent'));
const TemplateDesign = React.lazy(() => import('../pages/apps/VisitContent/Templates/TemplateDesign'));
const Templates = React.lazy(() => import('../pages/apps/VisitContent/Templates/index'));
const TemplateById = React.lazy(() => import('../pages/apps/VisitContent/TemplateById/index'));
const PromoSubjectTemplate = React.lazy(() => import('../pages/apps/VisitContent/PromoSubject/PageTemplate'));
const TemplateAddCard = React.lazy(() =>
    import('../pages/apps/VisitContent/PromoSubject/PageTemplate/TemplateAddCard')
);
const PromoSubjectTemplateDesign = React.lazy(() =>
    import('../pages/apps/VisitContent/PromoSubject/PageTemplate/TemplateDesign')
);
const PromoSubjectConnectTemplate = React.lazy(() =>
    import('../pages/apps/VisitContent/PromoSubject/PageTemplate/ConnectTemplates')
);
// PRODUCT PROMO STRATEGY
const annualProductMix = React.lazy(() => import('../pages/apps/PassportOfProducts/ProductPromoStrategy/index'));

//Strategy Page Detail
const strategyPageDetail = React.lazy(() =>
    import('../pages/apps/PassportOfProducts/ProductPromoStrategy/ProductGant/PageDetail/index')
);

// Work Place
const WorkPlace = React.lazy(() => import('../pages/apps/WorkPlace'));

//Finance
const finance = React.lazy(() => import('../pages/apps/Finance'));

const ProcessProjectType = React.lazy(() => import('../pages/apps/Tom'));
const MainPocess = React.lazy(() => import('../pages/apps/Tom/MainProcess'))
const BusinessProcess = React.lazy(() => import('../pages/apps/Tom/BusinessProcess'))
const Process = React.lazy(() => import('../pages/apps/Tom/Process'))

const ActivityType = React.lazy(()=>import('../pages/apps/Tom/ActivityType'));
const SubProcess = React.lazy(()=>import('../pages/apps/Tom/SubProcess'));

const NewSubProcess = React.lazy(()=>import('../pages/apps/Tom/SubProcess/AddNewSubProcess'));


const BrochureProduction = React.lazy(()=>import('../pages/apps/Tom/BrochureProduction'));

// root routes
// GİRİŞ URL ------------
const rootRoute = {
    path: '/',
    exact: true,
    component: () => <Redirect to="/apps/calendar" />,
    route: PrivateRoute,
};

// dashboards
const dashboardRoutes = {
    path: '/dashboard',
    name: 'Dashboards',
    icon: 'uil-home-alt',
    header: 'Navigation',
    children: [
        {
            path: '/dashboard/analytics',
            name: 'Analytics',
            component: AnalyticsDashboard,
            route: PrivateRoute,
        },
        {
            path: '/dashboard/crm',
            name: 'CRM',
            component: CRMDashboard,
            route: PrivateRoute,
        },
        {
            path: '/dashboard/ecommerce',
            name: 'Ecommerce',
            badge: {
                variant: 'success',
                text: '3',
            },
            component: EcommerceDashboard,
            route: PrivateRoute,
        },
        {
            path: '/dashboard/project',
            name: 'Project',
            component: ProjectDashboard,
            route: PrivateRoute,
        },
        ////----------  PRE-PLAN  -----------
        {
            path: '/apps/marketing/visitmix/pre-plan',
            name: 'Project',
            component: PrePlan,
            route: PrivateRoute,
        },
        ////----------  Calendar-(marketing)  -----------
        {
            path: '/apps/marketing/visitmix/calendar',
            name: 'Project',
            component: CalendarM,
            route: PrivateRoute,
        },
        ////---------- Country  -----------
        {
            path: '/apps/country',
            name: 'Country',
            component: Country,
            route: PrivateRoute,
        },
        ////---------- Task Management  -----------
        {
            path: '/apps/targetoperatingmodel',
            name: 'TargetOperatingModel',
            component: TargetOperatingModel,
            route: PrivateRoute,
        },
        ////---------- Action CheckList  -----------
        {
            path: '/apps/actionchecklist',
            name: 'ActionCheckList',
            component: ActionCheckList,
            route: PrivateRoute,
        },
        ////---------- GANTT  -----------
        {
            path: '/apps/gantt',
            name: 'Gantt',
            component: Gantt,
            route: PrivateRoute,
        },
        {
            path: '/apps/budget',
            name: 'Budget',
            component: Budget,
            route: PrivateRoute,
        },
        {
            path: '/apps/training',
            name: 'Training',
            component: Training,
            route: PrivateRoute,
        },
        {
            path: '/apps/training-detail',
            name: 'TrainingDetail',
            component: TrainingDetail,
            route: PrivateRoute,
        },
        {
            path: '/apps/brochure',
            name: 'Brochure',
            component: Brochure,
            route: PrivateRoute,
            exact: true,
        },
        // {
        //     path: '/apps/brochure/template/:id',
        //     name: 'TemplateDescription',
        //     component: TemplateDescription,
        //     route: PrivateRoute,
        //     exact: true,
        // },
        {
            path: '/apps/brochure/template',
            name: 'BrochureTemplate',
            component: BrochureTemplate,
            route: PrivateRoute,
            exact: true,
        },
        {
            path: '/apps/brochure/template/design',
            name: 'DesignTemplate',
            component: DesignTemplate,
            route: PrivateRoute,
            exact: true,
        },
        {
            path: '/apps/brochure/template/details',
            name: 'DesignDetails',
            component: DesignDetails,
            route: PrivateRoute,
            exact: true,
        },
        {
            path: '/apps/brochure/template/details=:id&Country=:token',
            name: 'TemplateDetails',
            component: TemplateDetails,
            route: PrivateRoute,
            exact: true,
        },
        {
            path: '/apps/brochure/content',
            name: 'BrochureContent',
            component: BrochureContent,
            route: PrivateRoute,
            exact: true,
        },
        {
            path: '/apps/campaing',
            name: 'PromoCampaing',
            component: PromoCampaing,
            route: PrivateRoute,
            exact: true,
        },
        {
            path: '/apps/brochure/translate',
            name: 'BrochureTranslate',
            component: BrochureTranslate,
            route: PrivateRoute,
            exact: true,
        },
        {
            path: '/apps/brochure/page-gallery',
            name: 'PageGallery',
            component: PageGallery,
            route: PrivateRoute,
            exact: true,
        },
        {
            path: '/apps/brochure/need',
            name: 'BrochureNeed',
            component: BrochureNeed,
            route: PrivateRoute,
            exact: true,
        },
        {
            path: '/apps/brochure/benefits',
            name: 'BrochureBenefits',
            component: BrochureBenefits,
            route: PrivateRoute,
            exact: true,
        },
        {
            path: '/apps/brochure/disadvantages',
            name: 'Disadvantages',
            component: Disadvantages,
            route: PrivateRoute,
            exact: true,
        },

        {
            path: '/apps/annual-product-mix',
            name: 'annual-product-mix',
            component: annualProductMix,
            route: PrivateRoute,
            exact: true,
        },
        {
            path: '/apps/annual-product-mix/pages',
            name: 'strategy-pages',
            component: strategyPageDetail,
            route: PrivateRoute,
            exact: true,
        },
        //RECONCILIATION
        {
            path: '/reconciliation',
            name: 'reconciliation',
            component: reconciliation,
            route: PrivateRoute,
            exact: true,
        },

        // PASSPORT OF PRODUCT
        {
            path: '/passport-of-products',
            name: 'passport-of-products',
            component: passportOfProducts,
            route: PrivateRoute,
            exact: true,
        },
        {
            path: '/passport-of-products/pages',
            name: 'passport-of-products-pages',
            component: passportOfProductsPages,
            route: PrivateRoute,
            exact: true,
        },
        // COMPETİTOR
        {
            path: '/apps/competitor',
            name: 'competitor',
            component: competitor,
            route: PrivateRoute,
            exact: true,
        },
        {
            path: '/apps/form-type',
            name: 'form-type',
            component: formType,
            route: PrivateRoute,
            exact: true,
        },
        // SURVEY
        {
            path: '/apps/survey',
            name: 'survey',
            component: survey,
            route: PrivateRoute,
            exact: true,
        },
        {
            path: '/apps/survey/dashboard',
            name: 'surveyDashboard',
            component: surveyDashboard,
            route: PrivateRoute,
            exact: true,
        },
        {
            path: '/apps/survey-add-question',
            name: 'survey-add-question',
            component: surveyAddQuestion,
            route: PrivateRoute,
            exact: true,
        },
        {
            path: '/apps/survey-single-answer',
            name: 'survey-single-answer',
            component: surveySingleAnswer,
            route: PrivateRoute,
            exact: true,
        },
        {
            path: '/apps/survey-multi-answer',
            name: 'survey-multi-answer',
            component: surveyMultiAnswer,
            route: PrivateRoute,
            exact: true,
        },
        {
            path: '/apps/survey-text-answer',
            name: 'survey-text-answer',
            component: surveyTextAnswer,
            route: PrivateRoute,
            exact: true,
        },

        //CRM
        {
            path: '/apps/CRM/MMDataCheck',
            name: 'mm-data-check',
            component: mmDataCheck,
            route: PrivateRoute,
            exact: true,
        },

        // HR
        {
            path: '/hr/corporate',
            name: 'hrCorporate',
            component: hrCorporate,
            route: PrivateRoute,
            exact: true,
        },
        {
            path: '/hr/company-departmant',
            name: 'hrCompanyDepartmant',
            component: hrCompanyDepartmant,
            route: PrivateRoute,
            exact: true,
        },
        {
            path: '/apps/brochure/template/design/disadvantage/pagelist=:id&Country=:token',
            name: 'DisadvantePageListTemplate',
            component: DisadvantePageListTemplate,
            route: PrivateRoute,
            exact: true,
        },
        {
            path: '/apps/brochure/template/detailspagelist=:id&Country=:token',
            name: 'DisadvantagesDetails',
            component: DisadvantagesDetails,
            route: PrivateRoute,
            exact: true,
        },
        {
            path: '/apps/brochure/disadvantages/design',
            name: 'DisadvantagesDesign',
            component: DisadvantagesDesign,
            route: PrivateRoute,
            exact: true,
        },
        {
            path: '/apps/brochure/template/detailsgallery=:id&Country=:token',
            name: 'DetailsGallery',
            component: DisadvantagesPageGalleryDetails,
            route: PrivateRoute,
            exact: true,
        },
        {
            path: '/apps/brochure/template/design/disadvantage/pagegallery=:id&Country=:token',
            name: 'DisadvantePageGalleryTemplate',
            component: DisadvantePageGalleryTemplate,
            route: PrivateRoute,
            exact: true,
        },
        {
            path: '/apps/materials',
            name: 'Materials',
            component: Materials,
            route: PrivateRoute,
        },
        {
            path: '/apps/company-type',
            name: 'CompanyType',
            component: CompanyType,
            route: PrivateRoute,
        },
        {
            path: '/apps/connect-materials',
            name: 'ConnectMaterials',
            component: ConnectMaterial,
            route: PrivateRoute,
        },
        {
            path: '/apps/settings',
            name: 'Settings',
            component: Settings,
            route: PrivateRoute,
        },
        {
            path: '/apps/settings/table-settings',
            name: 'Table Settings',
            component: TableSettings,
            route: PrivateRoute,
        },
        {
            path: '/apps/budgeting',
            name: 'Budgeting',
            component: Budgeting,
            route: PrivateRoute,
        },
        // Visit Content
        {
            path: '/apps/visit-content',
            name: 'VisitContent',
            component: VisitContent,
            route: PrivateRoute,
            exact: true,
        },
        // New Template Design
        {
            path: '/apps/template-design/itemid=:itemId&productname=:itemName&templateid=:templateId&sub=:isSub',
            name: 'TemplateDesign',
            component: TemplateDesign,
            route: PrivateRoute,
            exact: true,
        },
        {
            path: '/apps/templates/connect=:ids&product=:name&sub=:isSub',
            name: 'Templates',
            component: Templates,
            route: PrivateRoute,
            exact: true,
        },
        {
            path: '/apps/templates/templatedetails=:ids&Product=:name',
            name: 'TemplateById',
            component: TemplateById,
            route: PrivateRoute,
            exact: true,
        },
        {
            path: '/apps/templates/promoSubject=:id',
            name: 'PromoSubjectTemplate',
            component: PromoSubjectTemplate,
            route: PrivateRoute,
            exact: true,
        },
        {
            path: '/apps/templates/promoSubject/promoSubjectId=:promoSubjectId&pageName=:pageName&pageId=:pageId&isSub=:isSub',
            name: 'PromoSubjectAddTemplate',
            component: TemplateAddCard,
            route: PrivateRoute,
            exact: true,
        },
        {
            path: '/apps/connect/promoSubjectConnect/promoSubjectId=:promoSubjectId&pageName=:pageName&profileId=:profileId&needId=:needId&benefitId=:benefitId&connectPageId=:connectPageId&isSub=:isSub',
            name: 'PromoSubjectConnect',
            component: PromoSubjectConnectTemplate,
            route: PrivateRoute,
            exact: true,
        },
        {
            path: '/apps/templates/promoSubject/template-design/promoSubjectId=:promoSubjectId&pageName=:pageName&pageId=:pageId&connectTemplateId=:connectTemplateId&isSub=:isSub',
            name: 'PromoSubjectTemplateDesign',
            component: PromoSubjectTemplateDesign,
            route: PrivateRoute,
            exact: true,
        },
        {
            path: '/apps/CRM/WorkPlace',
            name: 'WorkPlace',
            component: WorkPlace,
            route: PrivateRoute,
            exact: true,
        },
        /**finance */
        {
            path: '/apps/finance',
            name: 'Finance',
            component: finance,
            route: PrivateRoute,
            exact: true,
        },
        {
     
                path: '/apps/tom/process-and-project-type',
                name: 'Process & Project Type',
                component: ProcessProjectType,
                route: PrivateRoute,
                exact: true

        },
        {
            path: '/apps/tom/main-process',
            name: 'Main Process',
            component: MainPocess,
            route: PrivateRoute,
            exact: true
        },
        {
            path: '/apps/tom/business-process',
            name: 'BusinessProcess',
            component: BusinessProcess,
            route: PrivateRoute,
            exact: true
        },
        {
            path: '/apps/tom/process',
            name: 'Process',
            component: Process,
            route: PrivateRoute,
            exact: true
        },
        {
            path: '/apps/tom/activity-type',
            name: 'ActivityType',
            component: ActivityType,
            route: PrivateRoute,
            exact: true
        },
        {
            path: '/apps/tom/sub-process',
            name: 'SubProcess',
            component: SubProcess,
            route: PrivateRoute,
            exact: true
        },
        {
            path: '/apps/tom/new-sub-process',
            name: 'NewSubProcess',
            component: NewSubProcess,
            route: PrivateRoute,
            exact: true
        }
    ],
};

const calendarAppRoutes = {
    path: '/apps/calendar',
    name: 'Calendar',
    route: PrivateRoute,
    roles: ['Admin'],
    icon: 'uil-calender',
    component: CalendarApp,
    header: 'Apps',
};

const chatAppRoutes = {
    path: '/apps/chat',
    name: 'Chat',
    route: PrivateRoute,
    roles: ['Admin'],
    icon: 'uil-comments-alt',
    component: ChatApp,
};

//
const marketingAppRoutes = {
    path: '/apps/marketing',
    name: 'marketing',
    route: PrivateRoute,
    roles: ['Admin'],
    icon: 'uil-store',
    children: [
        {
            path: '/apps/marketing/visitmix',
            name: 'Products',
            component: Marketing,
            route: PrivateRoute,
        },
        {
            path: '/apps/marketing/product-proiroty-allocation',
            name: 'Products',
            component: ProductPA,
            route: PrivateRoute,
        },
        {
            path: '/apps/marketing/micro-target',
            name: 'microTarget',
            component: MicroTarget,
            route: PrivateRoute,
        },
    ],
};

const activitylimitandsettingsAppRoutes = {
    path: '/apps/activitylimitandsettings',
    name: 'Activity Limit and Settings',
    route: PrivateRoute,
    roles: ['Admin'],
    icon: 'uil-comments-alt',
    component: ActivityLimitAndSettings,
};

// const prePlanAppRoutes = {
//     path: '/apps/marketing/visitmix/pre-plan',
//     name: 'marketing',
//     route: PrivateRoute,
//     roles: ['Admin'],
//     icon: 'uil-calender',
//     component: PrePlan,
//     header: 'PrePlan',
// };

//

const ecommerceAppRoutes = {
    path: '/apps/ecommerce',
    name: 'eCommerce',
    route: PrivateRoute,
    roles: ['Admin'],
    icon: 'uil-store',
    children: [
        {
            path: '/apps/ecommerce/products',
            name: 'Products',
            component: EcommerceProducts,
            route: PrivateRoute,
        },
        {
            path: '/apps/ecommerce/details',
            name: 'Product Details',
            component: ProductDetails,
            route: PrivateRoute,
        },
        {
            path: '/apps/ecommerce/orders',
            name: 'Orders',
            component: Orders,
            route: PrivateRoute,
        },
        {
            path: '/apps/ecommerce/order/details',
            name: 'Order Details',
            component: OrderDetails,
            route: PrivateRoute,
        },
        {
            path: '/apps/ecommerce/customers',
            name: 'Customers',
            component: Customers,
            route: PrivateRoute,
        },
        {
            path: '/apps/ecommerce/shopping-cart',
            name: 'Shopping Cart',
            component: Cart,
            route: PrivateRoute,
        },
        {
            path: '/apps/ecommerce/checkout',
            name: 'Checkout',
            component: Checkout,
            route: PrivateRoute,
        },
        {
            path: '/apps/ecommerce/sellers',
            name: 'Sellers',
            component: Sellers,
            route: PrivateRoute,
        },
    ],
};

const emailAppRoutes = {
    path: '/apps/email',
    name: 'Email',
    route: PrivateRoute,
    roles: ['Admin'],
    icon: 'uil-envelope',
    children: [
        {
            path: '/apps/email/inbox',
            name: 'Inbox',
            component: Inbox,
            route: PrivateRoute,
        },
        {
            path: '/apps/email/details',
            name: 'Email Details',
            component: EmailDetail,
            route: PrivateRoute,
        },
    ],
};

const projectAppRoutes = {
    path: '/apps/projects',
    name: 'Projects',
    route: PrivateRoute,
    roles: ['Admin'],
    icon: 'uil-briefcase',

    children: [
        {
            path: '/apps/projects/list',
            name: 'List',
            component: Projects,
            route: PrivateRoute,
        },
        {
            path: '/apps/projects/:id/details',
            name: 'Detail',
            component: ProjectDetail,
            route: PrivateRoute,
        },
        {
            path: '/apps/projects/gantt',
            name: 'Gantt',
            component: ProjectGannt,
            route: PrivateRoute,
        },
        {
            path: '/apps/projects/new',
            name: 'Create Project',
            component: ProjectForm,
            route: PrivateRoute,
        },
    ],
};

const socialAppRoutes = {
    path: '/apps/social',
    name: 'Social Feed',
    route: PrivateRoute,
    roles: ['Admin'],
    icon: 'uil-rss',
    component: SocialFeed,
};

const taskAppRoutes = {
    path: '/apps/tasks',
    name: 'Tasks',
    route: PrivateRoute,
    roles: ['Admin'],
    icon: 'uil-clipboard-alt',
    children: [
        {
            path: '/apps/tasks/list',
            name: 'Task List',
            component: TaskList,
            route: PrivateRoute,
        },
        {
            path: '/apps/tasks/details',
            name: 'Task List',
            component: TaskDetails,
            route: PrivateRoute,
        },
        {
            path: '/apps/tasks/kanban',
            name: 'Kanban',
            component: Kanban,
            route: PrivateRoute,
        },
    ],
};

const fileAppRoutes = {
    path: '/apps/file',
    name: 'File Manager',
    route: PrivateRoute,
    roles: ['Admin'],
    icon: 'uil-folder-plus',
    component: FileManager,
};

const appRoutes = [
    calendarAppRoutes,
    chatAppRoutes,

    marketingAppRoutes,
    // prePlanAppRoutes,
    activitylimitandsettingsAppRoutes,
    ecommerceAppRoutes,
    emailAppRoutes,
    projectAppRoutes,
    socialAppRoutes,
    taskAppRoutes,
    fileAppRoutes,
];

// pages
const pageRoutes = {
    path: '/pages',
    name: 'Pages',
    icon: 'uil-copy-alt',
    header: 'Custom',
    children: [
        {
            path: '/pages/profile',
            name: 'Profile',
            component: Profile,
            route: PrivateRoute,
        },
        {
            path: '/pages/profile2',
            name: 'Profile2',
            component: Profile2,
            route: PrivateRoute,
        },
        {
            path: '/pages/invoice',
            name: 'Invoice',
            component: Invoice,
            route: PrivateRoute,
        },
        {
            path: '/pages/faq',
            name: 'FAQ',
            component: FAQ,
            route: PrivateRoute,
        },
        {
            path: '/pages/pricing',
            name: 'Pricing',
            component: Pricing,
            route: PrivateRoute,
        },
        {
            path: '/pages/error-404-alt',
            name: 'Error - 404-alt',
            component: ErrorPageNotFoundAlt,
            route: PrivateRoute,
        },
        {
            path: '/pages/starter',
            name: 'Starter Page',
            component: Starter,
            route: PrivateRoute,
        },
        {
            path: '/pages/preloader',
            name: 'Starter Page',
            component: PreLoader,
            route: PrivateRoute,
        },
        {
            path: '/pages/timeline',
            name: 'Timeline',
            component: Timeline,
            route: PrivateRoute,
        },
    ],
};

// ui
const uiRoutes = {
    path: '/ui',
    name: 'Components',
    icon: 'uil-package',
    header: 'UI Elements',
    children: [
        {
            path: '/ui/base',
            name: 'Base UI',
            children: [
                {
                    path: '/ui/accordions',
                    name: 'Accordions',
                    component: Accordions,
                    route: PrivateRoute,
                },
                {
                    path: '/ui/alerts',
                    name: 'Alerts',
                    component: Alerts,
                    route: PrivateRoute,
                },
                {
                    path: '/ui/avatars',
                    name: 'Avatars',
                    component: Avatars,
                    route: PrivateRoute,
                },
                {
                    path: '/ui/badges',
                    name: 'Badges',
                    component: Badges,
                    route: PrivateRoute,
                },
                {
                    path: '/ui/breadcrumb',
                    name: 'Breadcrumb',
                    component: Breadcrumbs,
                    route: PrivateRoute,
                },
                {
                    path: '/ui/buttons',
                    name: 'Buttons',
                    component: Buttons,
                    route: PrivateRoute,
                },
                {
                    path: '/ui/cards',
                    name: 'Cards',
                    component: Cards,
                    route: PrivateRoute,
                },
                {
                    path: '/ui/carousel',
                    name: 'Carousel',
                    component: Carousels,
                    route: PrivateRoute,
                },
                {
                    path: '/ui/dropdowns',
                    name: 'Dropdowns',
                    component: Dropdowns,
                    route: PrivateRoute,
                },
                {
                    path: '/ui/embedvideo',
                    name: 'EmbedVideo',
                    component: EmbedVideo,
                    route: PrivateRoute,
                },
                {
                    path: '/ui/grid',
                    name: 'Grid',
                    component: Grid,
                    route: PrivateRoute,
                },
                {
                    path: '/ui/listgroups',
                    name: 'List Groups',
                    component: ListGroups,
                    route: PrivateRoute,
                },
                {
                    path: '/ui/modals',
                    name: 'Modals',
                    component: Modals,
                    route: PrivateRoute,
                },
                {
                    path: '/ui/notifications',
                    name: 'Notifications',
                    component: Notifications,
                    route: PrivateRoute,
                },
                {
                    path: '/ui/offcanvas',
                    name: 'Offcanvas',
                    component: Offcanvases,
                    route: PrivateRoute,
                },
                {
                    path: '/ui/paginations',
                    name: 'Paginations',
                    component: Paginations,
                    route: PrivateRoute,
                },
                {
                    path: '/ui/popovers',
                    name: 'Popovers',
                    component: Popovers,
                    route: PrivateRoute,
                },
                {
                    path: '/ui/progress',
                    name: 'Progress',
                    component: Progress,
                    route: PrivateRoute,
                },
                {
                    path: '/ui/ribbons',
                    name: 'Ribbons',
                    component: Ribbons,
                    route: PrivateRoute,
                },
                {
                    path: '/ui/spinners',
                    name: 'Spinners',
                    component: Spinners,
                    route: PrivateRoute,
                },
                {
                    path: '/ui/tabs',
                    name: 'Tabs',
                    component: Tabs,
                    route: PrivateRoute,
                },
                {
                    path: '/ui/tooltips',
                    name: 'Tooltips',
                    component: Tooltips,
                    route: PrivateRoute,
                },
                {
                    path: '/ui/typography',
                    name: 'Typography',
                    component: Typography,
                    route: PrivateRoute,
                },
            ],
        },
        {
            path: '/ui/extended',
            name: 'Extended UI',
            children: [
                {
                    path: '/ui/dragdrop',
                    name: 'Drag and Drop',
                    component: DragDrop,
                    route: PrivateRoute,
                },
                {
                    path: '/ui/rangesliders',
                    name: 'Range Sliders',
                    component: RangeSliders,
                    route: PrivateRoute,
                },
                {
                    path: '/ui/ratings',
                    name: 'Ratings',
                    component: Ratings,
                    route: PrivateRoute,
                },
            ],
        },
        {
            path: '/ui/widgets',
            name: 'Widgets',
            component: Widgets,
            route: PrivateRoute,
        },
        {
            path: '/ui/icons',
            name: 'Icons',
            children: [
                {
                    path: '/ui/icons/dripicons',
                    name: 'Dripicons',
                    component: Dripicons,
                    route: PrivateRoute,
                },
                {
                    path: '/ui/icons/mdi',
                    name: 'Material Design',
                    component: MDIIcons,
                    route: PrivateRoute,
                },
                {
                    path: '/ui/icons/unicons',
                    name: 'Unicons',
                    component: Unicons,
                    route: Unicons,
                },
            ],
        },
        {
            path: '/ui/forms',
            name: 'Forms',
            children: [
                {
                    path: '/ui/forms/basic',
                    name: 'Basic Elements',
                    component: BasicForms,
                    route: PrivateRoute,
                },
                {
                    path: '/ui/forms/advanced',
                    name: 'Form Advanced',
                    component: FormAdvanced,
                    route: PrivateRoute,
                },
                {
                    path: '/ui/forms/validation',
                    name: 'Form Validation',
                    component: FormValidation,
                    route: PrivateRoute,
                },
                {
                    path: '/ui/forms/wizard',
                    name: 'Form Wizard',
                    component: FormWizard,
                    route: PrivateRoute,
                },
                {
                    path: '/ui/forms/upload',
                    name: 'File Upload',
                    component: FileUpload,
                    route: PrivateRoute,
                },
                {
                    path: '/ui/forms/editors',
                    name: 'Editors',
                    component: Editors,
                    route: PrivateRoute,
                },
            ],
        },
        {
            path: '/ui/charts',
            name: 'Charts',
            children: [
                {
                    path: '/ui/charts/apex',
                    name: 'Apex',
                    component: ApexChart,
                    route: PrivateRoute,
                },
                {
                    path: '/ui/charts/brite',
                    name: 'Brite',
                    component: BriteChart,
                    route: PrivateRoute,
                },
                {
                    path: '/ui/charts/chartjs',
                    name: 'Chartjs',
                    component: ChartJs,
                    route: PrivateRoute,
                },
            ],
        },
        {
            path: '/ui/tables',
            name: 'Tables',
            children: [
                {
                    path: '/ui/tables/basic',
                    name: 'Basic',
                    component: BasicTables,
                    route: PrivateRoute,
                },
                {
                    path: '/ui/tables/advanced',
                    name: 'Advanced',
                    component: AdvancedTables,
                    route: PrivateRoute,
                },
            ],
        },
        {
            path: '/ui/maps',
            name: 'Maps',
            children: [
                {
                    path: '/ui/googlemaps',
                    name: 'Google Maps',
                    component: GoogleMaps,
                    route: PrivateRoute,
                },
                {
                    path: '/ui/vectorMaps',
                    name: 'Google Maps',
                    component: VectorMaps,
                    route: PrivateRoute,
                },
            ],
        },
    ],
};

const otherPublicRoutes = [
    {
        path: '/landing',
        name: 'landing',
        component: Landing,
        route: Route,
    },
    {
        path: '/maintenance',
        name: 'Maintenance',
        component: Maintenance,
        route: Route,
    },
    {
        path: '/error-404',
        name: 'Error - 404',
        component: ErrorPageNotFound,
        route: Route,
    },
    {
        path: '/404',
        name: 'Error404',
        component: Error404,
        route: Route,
    },
    {
        path: '/error-500',
        name: 'Error - 500',
        component: ServerError,
        route: Route,
    },
    {
        path: '/account/confirm',
        name: 'Confirm',
        component: Confirm,
        route: Route,
    },
];

// flatten the list of all nested routes
const flattenRoutes = (routes) => {
    let flatRoutes = [];

    routes = routes || [];
    routes.forEach((item) => {
        flatRoutes.push(item);

        if (typeof item.children !== 'undefined') {
            flatRoutes = [...flatRoutes, ...flattenRoutes(item.children)];
        }
    });
    return flatRoutes;
};

// auth
const authRoutes = [
    {
        path: '/account/login',
        name: 'Login',
        component: Login,
        route: Route,
    },
    {
        path: '/account/logout',
        name: 'Logout',
        component: Logout,
        route: Route,
    },
    {
        path: '/account/register',
        name: 'Register',
        component: Register,
        route: Route,
    },
    {
        path: '/account/forget-password',
        name: 'Forget Password',
        component: ForgetPassword,
        route: Route,
    },
    {
        path: '/account/change-password/:token',
        name: 'Password Reminder',
        component: ChangePassword,
        route: Route,
    },
    {
        path: '/account/lock-screen',
        name: 'Lock Screen',
        component: LockScreen,
        route: Route,
    },
    {
        path: '/account/login2',
        name: 'Login2',
        component: Login2,
        route: Route,
    },
    {
        path: '/account/logout2',
        name: 'Logout2',
        component: Logout2,
        route: Route,
    },
    {
        path: '/account/register2',
        name: 'Register2',
        component: Register2,
        route: Route,
    },
    {
        path: '/account/confirm2',
        name: 'Confirm2',
        component: Confirm2,
        route: Route,
    },
    {
        path: '/account/forget-password2',
        name: 'Forget Password2',
        component: ForgetPassword2,
        route: Route,
    },
    {
        path: '/account/lock-screen2',
        name: 'Lock Screen2',
        component: LockScreen2,
        route: Route,
    },
];

// All routes
const authProtectedRoutes = [
    rootRoute,
    dashboardRoutes,
    ...appRoutes,
    pageRoutes,
    uiRoutes,
    {
        path: '*',
        name: 'notfound',
        component: () => <Redirect to="/404" />,
        route: Route,
    },
];
const publicRoutes = [...authRoutes, ...otherPublicRoutes];

const authProtectedFlattenRoutes = flattenRoutes([...authProtectedRoutes]);
const publicProtectedFlattenRoutes = flattenRoutes([...publicRoutes]);

export { publicRoutes, authProtectedRoutes, authProtectedFlattenRoutes, publicProtectedFlattenRoutes };
