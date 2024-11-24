import React from 'react';
import logo from '../../assets/freshcart-logo.svg';
import amazon from '../../assets/amazon.svg'
import app from '../../assets/app.svg'
import google from '../../assets/google.svg'
import paypal from '../../assets/paypal.png'
export default function Footer() {
  return (
    <footer className="bg-main-light w-full end-0 bottom-0">
      <div className="px-5 md:py-8 ">
        <div className="sm:flex sm:items-center sm:justify-between">
          <img src={logo} className="h-8 mb-4 sm:mb-0" alt="freshcart Logo" />
          <ul className="flex flex-wrap gap-3 items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <img src={amazon} className='w-[50px]' />
            </li>
            <li>
              <img src={app} className='w-[60px]' />
            </li>
            <li>
              <img src={google} className='w-[60px]' />
            </li>
            <li>
              <img src={paypal} className='w-[60px]' />
            </li>
          </ul>
        </div>
        <form action="https://app.convertkit.com/forms/4692392/subscriptions" className="seva-form formkit-form" method="post" data-sv-form={4692392} data-uid="344e3b5c48" data-format="inline" data-version={5} data-options="{&quot;settings&quot;:{&quot;after_subscribe&quot;:{&quot;action&quot;:&quot;message&quot;,&quot;success_message&quot;:&quot;Success! Now check your email to confirm your subscription.&quot;,&quot;redirect_url&quot;:&quot;&quot;},&quot;analytics&quot;:{&quot;google&quot;:null,&quot;fathom&quot;:null,&quot;facebook&quot;:null,&quot;segment&quot;:null,&quot;pinterest&quot;:null,&quot;sparkloop&quot;:null,&quot;googletagmanager&quot;:null},&quot;modal&quot;:{&quot;trigger&quot;:&quot;timer&quot;,&quot;scroll_percentage&quot;:null,&quot;timer&quot;:5,&quot;devices&quot;:&quot;all&quot;,&quot;show_once_every&quot;:15},&quot;powered_by&quot;:{&quot;show&quot;:true,&quot;url&quot;:&quot;https://convertkit.com/features/forms?utm_campaign=poweredby&utm_content=form&utm_medium=referral&utm_source=dynamic&quot;},&quot;recaptcha&quot;:{&quot;enabled&quot;:false},&quot;return_visitor&quot;:{&quot;action&quot;:&quot;show&quot;,&quot;custom_content&quot;:&quot;&quot;},&quot;slide_in&quot;:{&quot;display_in&quot;:&quot;bottom_right&quot;,&quot;trigger&quot;:&quot;timer&quot;,&quot;scroll_percentage&quot;:null,&quot;timer&quot;:5,&quot;devices&quot;:&quot;all&quot;,&quot;show_once_every&quot;:15},&quot;sticky_bar&quot;:{&quot;display_in&quot;:&quot;top&quot;,&quot;trigger&quot;:&quot;timer&quot;,&quot;scroll_percentage&quot;:null,&quot;timer&quot;:5,&quot;devices&quot;:&quot;all&quot;,&quot;show_once_every&quot;:15}},&quot;version&quot;:&quot;5&quot;}" min-width="400 500 600 700 800">
          <div data-style="clean" className="flex items-end mb-3">
            <ul className="formkit-alert formkit-alert-error" data-element="errors" data-group="alert" />
            <div data-element="fields" data-stacked="false" className="flex items-center w-full max-w-md mb-3 seva-fields formkit-fields">
              <div className="relative w-full mr-3 formkit-field">
                <label htmlFor="member_email" className="hidden  mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email address</label>
                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                  <svg className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                    <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                    <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                  </svg>
                </div>
                <input id="member_email" className="formkit-input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full pl-10 p-2.5 dark:bg-white  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" name="email_address" aria-label="Email Address" placeholder="Your email address..." required type="email" />
              </div>
              <button data-element="submit" className="formkit-submit">
                <div className="formkit-spinner">
                  <div />
                  <div />
                  <div />
                </div>
                <span className="px-5 py-3 text-sm font-medium text-center text-white bg-green-700 rounded-lg cursor-pointer hover:bg-green-800 focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Subscribe</span>
              </button>
            </div>
          </div>
        </form>
        <hr className="my-6 border-gray-200 dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <span className="hover:underline text-green-500">FreshCart™</span>. All Rights Reserved.</span>
      </div>
    </footer>
  );
}