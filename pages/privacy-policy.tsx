import { NextPage } from "next";
import Link from "next/link";

import { makeStyles } from "../src/util/style.utils";

const useStyles = makeStyles()({
  container: {
    margin: "0 auto",
    padding: "32px",
    maxWidth: "1200px",
  },
});

const PrivacyPolicy: NextPage = () => {
  const { classes } = useStyles();
  return (
    <div className={classes.container}>
      <h2>Shufle Privacy Policy</h2>
      <p>
        This Privacy Policy describes how your personal information is
        collected, used, and shared when you visit{" "}
        <Link href="/">https://www.shufle.ca</Link> (the “Site”).
      </p>
      <h4>PERSONAL INFORMATION WE COLLECT</h4>
      <p>
        When you visit the Site, we automatically collect certain information
        about your device, including information about your web browser, IP
        address, time zone, and some of the cookies that are installed on your
        device. Additionally, as you browse the Site, we collect information
        about the individual web pages that you view and information about how
        you interact with the Site. We refer to this automatically-collected
        information as “Device Information.”
      </p>
      <p>We collect Device Information using the following technologies:</p>
      <ul>
        <li>
          “Cookies” are data files that are placed on your device or computer
          and often include an anonymous unique identifier. For more information
          about cookies, and how to disable cookies, visit{" "}
          <Link href="http://www.allaboutcookies.org">
            http://www.allaboutcookies.org
          </Link>
          .
        </li>
        <li>
          “Log files” track actions occurring on the Site, and collect data
          including your IP address, browser type, Internet service provider,
          referring/exit pages, and date/time stamps.
        </li>
      </ul>
      <p>
        When we talk about “Personal Information” in this Privacy Policy, we are
        talking about Device Information.
      </p>
      <h4>HOW DO WE USE YOUR PERSONAL INFORMATION?</h4>
      <p>
        We use the Device Information that we collect to help us to improve and
        optimize our Site (for example, by generating analytics about how our
        players browse and interact with the Site, and to assess the success of
        our marketing and advertising campaigns).
      </p>
      <h4>SHARING YOUR PERSONAL INFORMATION</h4>
      <p>
        We use Mixpanel to help us understand how our customers use the
        Site--you can read more about how Mixpanel uses your Personal
        Information here:{" "}
        <Link href="https://mixpanel.com/legal/privacy-policy/">
          https://mixpanel.com/legal/privacy-policy/
        </Link>
        . Use of Mixpanel is on an opt in basis and you can manage your
        preferences here:{" "}
        <Link href="/preferences">https://www.shufle.ca/preferences</Link>.
      </p>
      <p>
        Finally, we may also share your Personal Information to comply with
        applicable laws and regulations, to respond to a subpoena, search
        warrant or other lawful request for information we receive, or to
        otherwise protect our rights.
      </p>
      <h4>DO NOT TRACK</h4>
      <p>
        Please note that we may not alter our Site’s data collection and use
        practices when we see a Do Not Track signal from your browser. However,
        our usage of Mixpanel will be disabled when we see a Do Not Track signal
        from your browser.
      </p>
      <h4>YOUR RIGHTS</h4>
      <p>
        If you are a European resident, you have the right to access personal
        information we hold about you and to ask that your personal information
        be corrected, updated, or deleted. If you would like to exercise this
        right, please contact us through the contact information below.
      </p>
      <p>
        Additionally, if you are a European resident we note that we are
        processing your information in order to fulfill contracts we might have
        with you (for example if you make an order through the Site), or
        otherwise to pursue our legitimate business interests listed above.
        Additionally, please note that your information will be transferred
        outside of Europe, including to Canada and the United States.
      </p>
      <h4>CHANGES</h4>
      <p>
        We may update this privacy policy from time to time in order to reflect,
        for example, changes to our practices or for other operational, legal or
        regulatory reasons.
      </p>
      <h4>CONTACT US</h4>
      <p>
        For more information about our privacy practices, if you have questions,
        or if you would like to make a complaint, please contact us on Twitter
        at{" "}
        <Link href="https://twitter.com/PlayShufle">
          https://twitter.com/PlayShufle
        </Link>
      </p>
      <p>Last updated: March 24, 2022</p>
    </div>
  );
};

export default PrivacyPolicy;
