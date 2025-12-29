import React from "react";
import CareersBanner from "../../components/user/careersBanner";
import JoinUsSection from "../../components/user/careersJoinUs";
import HiringSection from "../../components/user/hiringSection";
import JobApplicationForm from "../../components/user/careerForm";
import { Helmet } from "react-helmet";

const Careers = () => {
  return (
    <section>
      <Helmet>
        <title>Careers at DNS Real State</title>
        <meta
          name="description"
          content="Join DNS Real State and build your future with a team that's redefining the real estate experience. Explore open roles today!"
        />
      </Helmet>
      <CareersBanner />
      <JoinUsSection />
      <HiringSection />
      <JobApplicationForm />
    </section>
  );
};

export default Careers;
