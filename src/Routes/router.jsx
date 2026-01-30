import { createBrowserRouter } from "react-router";
import RootLayouts from "../Layouts/RootLayouts";
import Home from "../Page/Home/Home";
import LogIn from "../Page/Auth/Login";
import Register from "../Page/Auth/Register";
import DashboardLayouts from "../Layouts/DashboardLayouts";
import AddBook from "../Page/Dashboard/AddJobs";
import MyProfile from "../Page/Dashboard/MyProfile";
import ManageUser from "../Page/Dashboard/ManageUser";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoutes";
import MyBooks from "../Page/Dashboard/MyJobs";
import EditBook from "../Page/Dashboard/EditJob";
import AllBooks from "../Page/AllJobs/AllJobs";
import BookDetails from "../Page/AllJobs/JobDetails";
import MyOrders from "../Page/Dashboard/MyOrders/MyOrders";
import PaymentSuccess from "../Page/Dashboard/Payment/PaymentSuccess";
import PaymentCancel from "../Page/Dashboard/Payment/PaymentCancel";
import Invoices from "../Page/Dashboard/Invoices/Invoices";
import LibrarianOrders from "../Page/Dashboard/Orders/LibrarianOrders";
import AdminManageBooks from "../Page/Dashboard/ManageApplications/AdminManageApplicationss";
import Wishlist from "../Page/Dashboard/Wishlists/wishlist";
import LibrarianRoutes from "./LibrarianRoutes";
import statistic from "../Page/Dashboard/Statistic/statistic";
import MyJobs from "../Page/Dashboard/MyJobs";
import EditJob from "../Page/Dashboard/EditJob";
import JobApplications from "../Page/Dashboard/Orders/LibrarianOrders";
import ApplyFreelancer from "../Page/Dashboard/ApplyForFreelancer/ApplyFreelancer";
import FreelancerApplications from "../Page/Dashboard/ManageApplications/AdminManageApplicationss";
import PostGig from "../Page/Dashboard/PostGigs/PostGig";
import MyGigs from "../Page/Dashboard/MyGigs/myGigs";
import AllGigs from "../Page/AllGigs/allGigs";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayouts,
    children: [
      {
        index: true,
        Component: Home,
      },

      {
        path: "/jobs",
        Component: AllBooks,
      },
      {
        path: "/gigs",
        Component: AllGigs,
      },
      {
        path: "/job-details/:id",
        element: (
          <PrivateRoute>
            <BookDetails></BookDetails>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    Component: LogIn,
  },
  {
    path: "/register",
    Component: Register,
  },

  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayouts></DashboardLayouts>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        Component: statistic,
      },
      {
        path: "analytics",
        Component: statistic,
      },
      {
        path: "user/orders",
        Component: MyOrders,
      },
      {
        path: "user/invoices",
        Component: Invoices,
      },
      {
        path: "user/wishlists",
        Component: Wishlist,
      },
      {
        path: "freelancer/add-book",
        element: (
          <LibrarianRoutes>
            <AddBook></AddBook>
          </LibrarianRoutes>
        ),
      },

      {
        path: "freelancer/my-jobs",
        element: <MyJobs></MyJobs>,
      },
      {
        path: "freelancer/postGigs",
        element: <PostGig></PostGig>,
      },
      {
        path: "freelancer/myGigs",
        element: <MyGigs></MyGigs>,
      },

      {
        path: "edit-job/:id",
        element: (
          <LibrarianRoutes>
            <EditJob></EditJob>
          </LibrarianRoutes>
        ),
      },
      {
        path: "freelancer/orders",
        element: (
          <LibrarianRoutes>
            <JobApplications></JobApplications>
          </LibrarianRoutes>
        ),
      },
      {
        path: "apply-for-freelancer",
        element: (
          <LibrarianRoutes>
            <ApplyFreelancer></ApplyFreelancer>
          </LibrarianRoutes>
        ),
      },
      {
        path: "my-profile",
        Component: MyProfile,
      },
      {
        path: "manage-user",
        element: (
          <AdminRoute>
            <ManageUser></ManageUser>
          </AdminRoute>
        ),
      },
      {
        path: "admin/manage-applications",
        element: (
          <AdminRoute>
            <FreelancerApplications></FreelancerApplications>
          </AdminRoute>
        ),
      },
      {
        path: "payment-success",
        Component: PaymentSuccess,
      },
      {
        path: "payment-cancelled",
        Component: PaymentCancel,
      },
    ],
  },
]);

export default router;
