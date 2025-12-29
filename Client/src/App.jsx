import { Route, Routes } from "react-router";
import ListingProperties from "./pages/user/ListingPage";
import UserLayout from "./components/user/Layout";
import PropertyPerticular from "./pages/user/propertyPerticular";
import LandingPage from "./pages/user/LandingPage";
import PerticularBlog from "./pages/user/perticularBlog";
import Developers from "./pages/user/developers";
import Comunities from "./pages/user/comunities";
import PerticularDevelopers from "./pages/user/perticularDevelopers";
import PerticularCommunities from "./pages/user/perticularCommunities";
import AdminLayout from "./components/admin/AdminLayout";
import Interests from "./pages/admin/AddInterest";
import AddBlog from "./pages/admin/AddBlog";
import AboutUs from "./pages/admin/aboutUs";
import WhyChooseUs from "./pages/admin/whyChooseUs";
import Testimonial from "./pages/admin/AddTestimonial";
import AddPropertyType from "./pages/admin/AddPropertyType";
import AllPropertyTypes from "./pages/admin/AllPropertyTypes";
import EditPropertyType from "./pages/admin/EditPropertyType";
import AddProperty from "./pages/admin/Add-Property";
import AddPropertyStatus from "./pages/admin/Add-Property-Status";
import AddConsultant from "./pages/admin/AddConsultant";
import AdminLogin from "./pages/auth/AdminLogin";
import CheckAuth from "./components/auth/check-auth";
import AddDeveloper from "./pages/admin/AddDeveloper";
import AddCommunity from "./pages/admin/add-communities";
import AdminDashboard from "./pages/admin/dashboard";
import CommingSoon from "./pages/user/LandingPage/CommingSoon";
import { Date } from "./pages/user/LandingPage/date";
import AddBanner from "./pages/admin/add-banner-images";
import AddFAQ from "./pages/admin/AddFaq";
import AddServices from "./pages/admin/add-Service";
import CalendarCompo from "./pages/user/LandingPage/calender";
import AllPropertyStatus from "./pages/admin/allPropertyStatus";
import EditPropertyStatus from "./pages/admin/EditPropertyStatus";
import AllProperties from "./pages/admin/AllProperties";
import EditProperty from "./pages/admin/Edit-Property";
import AllDevelopers from "./pages/admin/AllDevelopers";
import AllCommunities from "./pages/admin/AllCommunities";
import EditCommunity from "./pages/admin/EditCommunities";
import EditDeveloper from "./pages/admin/EditDeveloper";
import AllConsultant from "./pages/admin/AllConultants";
import EditConsultant from "./pages/admin/EditConsultant";
import AllTestimonial from "./pages/admin/AllTestimonials";
import AllBlogCategory from "./pages/admin/AllBlogCategories";
import AllInterests from "./pages/admin/AllInterests";
import AllBlogs from "./pages/admin/AllBlogs";
import AllFaqs from "./pages/admin/AllFaqs";
import EditBlogCategory from "./pages/admin/EditBlogCategory";
import EditBlog from "./pages/admin/EditBlog";
import EditTestimonial from "./pages/admin/EditTestimonal";
import EditFAQ from "./pages/admin/EditFaq";
import EditInterest from "./pages/admin/EditInterest";
import AddBlogCategory from "./pages/admin/AddBlogCategory";
import AllQueries from "./pages/admin/AllQueries";
import FooterContactDetails from "./pages/admin/AddFooterContactDetails";
import Valuation from "./pages/admin/Valuation";
import AllServices from "./pages/admin/AllServices";
import EditService from "./pages/admin/EditService";
import AllPreBookings from "./pages/admin/AllPreBook";
import AboutUsPage from "./pages/user/AboutUsPage";
import PrivacyPolicy from "./pages/user/policy";
import TermsAndConditions from "./pages/user/terms";
import ContactUs from "./pages/user/contactUS";
import AllSellInquiries from "./pages/admin/AllSellInquires";
import AllBrochureInquiries from "./pages/admin/AllDownloadBrosure";
import Careers from "./pages/user/careers";
import AddJobs from "./pages/admin/addJobs";
import AllJobs from "./pages/admin/allJobs";
import EditJob from "./pages/admin/editJob";
import TeamPage from "./pages/user/LandingPage/team";
import AllJobInquiries from "./pages/admin/allJobInquiries";
import AddTeamMember from "./pages/admin/addTeam";
import AllTeamMember from "./pages/admin/AllTeamMember";
import EditTeamMember from "./pages/admin/editTeamMembers";
import Services from "./pages/user/services";
import AllPageServices from "./pages/admin/AllPageServices";
import EditPageService from "./pages/admin/edit-Services";
import AddPageServices from "./pages/admin/add-Services";
import OffPlan from "./pages/user/offPlan";
import AllContactQueries from "./pages/admin/AllContactQueries";
import { ToastContainer } from "react-toastify";
import ContactQueryForm from "./components/user/ContactQueryForm";
import SellForm from "./pages/user/LandingPage/sellForm";
import BlogsPage from "./pages/user/Blogs";
// import AddBlogCategory from "./pages/admin/AllBlogCategories";
function App() {
  return (
    <div className="flex flex-col !h-full ">
      <Routes>
        {/* Public Routes */}

        {/* <Route path="/" element={<UserLayout />}> */}
        {/* <Route path="/" element={<CommingSoon />} />
        <Route path="/listing" element={<ListingProperties />} />
        <Route path="/property/:seoTitle" element={<PropertyPerticular />} /> */}
        {/* </Route> */}
        <Route path="/" element={<UserLayout />}>
          <Route path="" element={<LandingPage />} />
          <Route path="date" element={<Date />} />
          <Route path="Careers" element={<Careers />} />
          <Route path="c" element={<CalendarCompo />} />
          <Route path="listing" element={<ListingProperties />} />
          <Route path="listing/:statuss" element={<ListingProperties />} />
          <Route path="property/:seoTitle" element={<PropertyPerticular />} />
          <Route path="blog/:seoTitle" element={<PerticularBlog />} />
          <Route path="developers" element={<Developers />} />
          <Route path="developer/:id" element={<PerticularDevelopers />} />
          <Route path="community/:id" element={<PerticularCommunities />} />
          <Route path="communities" element={<Comunities />} />
          <Route path="about" element={<AboutUsPage />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="terms&condition" element={<TermsAndConditions />} />
          <Route path="contact-us" element={<ContactUs />} />
          <Route path="our-team" element={<TeamPage />} />
          <Route path="services" element={<Services />} />
          <Route path="off-Plan" element={<OffPlan />} />

          <Route path="sellForm" element={<SellForm />} />
          <Route path="blogs" element={<BlogsPage />} />
        </Route>

        {/* Protected Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/*"
          element={
            <CheckAuth>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="" element={<AdminDashboard />} />
          <Route path="add-property-status" element={<AddPropertyStatus />} />
          <Route
            path="add-contact-details"
            element={<FooterContactDetails />}
          />
          <Route path="all-sell-inquiries" element={<AllSellInquiries />} />
          <Route path="add-interest" element={<Interests />} />
          <Route path="all-queries" element={<AllQueries />} />
          <Route path="all-contact-queries" element={<AllContactQueries />} />
          <Route path="edit-interest/:id" element={<EditInterest />} />
          <Route path="all-interests" element={<AllInterests />} />
          <Route path="all-blogs" element={<AllBlogs />} />
          <Route path="all-faqs" element={<AllFaqs />} />
          <Route path="add-property-type" element={<AddPropertyType />} />
          <Route path="edit-property-type/:id" element={<EditPropertyType />} />
          <Route path="edit-testimonial/:id" element={<EditTestimonial />} />
          <Route path="brochureInquiries" element={<AllBrochureInquiries />} />
          <Route
            path="edit-property-status/:id"
            element={<EditPropertyStatus />}
          />
          <Route path="edit-faq/:id" element={<EditFAQ />} />
          <Route path="add-blog-category" element={<AddBlogCategory />} />
          <Route path="add-team-member" element={<AddTeamMember />} />
          <Route path="all-team-members" element={<AllTeamMember />} />
          <Route path="edit-team-member/:id" element={<EditTeamMember />} />
          <Route path="all-blog-categories" element={<AllBlogCategory />} />
          <Route path="edit-blog-category/:id" element={<EditBlogCategory />} />

          <Route path="edit-blog/:id" element={<EditBlog />} />
          <Route path="add-blog" element={<AddBlog />} />
          <Route path="add-job" element={<AddJobs />} />
          <Route path="all-jobs" element={<AllJobs />} />
          <Route path="all-job-inquiries" element={<AllJobInquiries />} />
          <Route path="edit-job/:id" element={<EditJob />} />

          <Route path="add-banner" element={<AddBanner />} />
          <Route path="about-us" element={<AboutUs />} />
          <Route path="why-choose-us" element={<WhyChooseUs />} />
          <Route path="add-testimonial" element={<Testimonial />} />
          <Route path="all-testimonials" element={<AllTestimonial />} />
          <Route path="add-consultant" element={<AddConsultant />} />
          <Route path="all-consultant" element={<AllConsultant />} />
          <Route path="edit-consultant/:id" element={<EditConsultant />} />
          <Route path="add-property" element={<AddProperty />} />
          <Route path="edit-property/:id" element={<EditProperty />} />
          <Route path="all-properties" element={<AllProperties />} />
          <Route path="add-developer" element={<AddDeveloper />} />
          <Route path="all-developers" element={<AllDevelopers />} />
          <Route path="add-community" element={<AddCommunity />} />
          <Route path="all-communities" element={<AllCommunities />} />
          <Route path="edit-community/:id" element={<EditCommunity />} />
          <Route path="edit-developer/:id" element={<EditDeveloper />} />
          <Route path="edit-service/:id" element={<EditService />} />
          <Route path="add-faq" element={<AddFAQ />} />
          <Route path="add-service" element={<AddServices />} />
          <Route path="all-property-types" element={<AllPropertyTypes />} />
          <Route path="all-property-status" element={<AllPropertyStatus />} />
          <Route path="valuation" element={<Valuation />} />
          <Route path="all-services" element={<AllServices />} />
          <Route path="all-pre-book" element={<AllPreBookings />} />

          <Route path="add-services" element={<AddPageServices />} />
          <Route path="Services" element={<AllPageServices />} />
          <Route path="edit-services/:id" element={<EditPageService />} />
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
