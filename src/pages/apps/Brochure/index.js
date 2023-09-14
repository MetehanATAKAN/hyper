import React, { useRef, useState } from 'react';
import EmailEditor from 'react-email-editor';

import SaveQuestion from '../../../components/Modals/SaveQuestion';
import TemplateDetails from '../../../components/TemplateDetails';
import { FetchApiPost } from '../../../utils/http.helper';
import Templates from './Templates';


const Brochure = () => {
    const emailEditorRef = useRef(null);
    const brochureHtml = `<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
  <head>
  <!--[if gte mso 9]>
  <xml>
    <o:OfficeDocumentSettings>
      <o:AllowPNG/>
      <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
  </xml>
  <![endif]-->
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="x-apple-disable-message-reformatting">
    <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
    <title></title>
    
      <style type="text/css">
        @media only screen and (min-width: 620px) {
    .u-row {
      width: 600px !important;
    }
    .u-row .u-col {
      vertical-align: top;
    }
  
    .u-row .u-col-33p33 {
      width: 199.98px !important;
    }
  
    .u-row .u-col-50 {
      width: 300px !important;
    }
  
    .u-row .u-col-100 {
      width: 600px !important;
    }
  
  }
  
  @media (max-width: 620px) {
    .u-row-container {
      max-width: 100% !important;
      padding-left: 0px !important;
      padding-right: 0px !important;
    }
    .u-row .u-col {
      min-width: 320px !important;
      max-width: 100% !important;
      display: block !important;
    }
    .u-row {
      width: calc(100% - 40px) !important;
    }
    .u-col {
      width: 100% !important;
    }
    .u-col > div {
      margin: 0 auto;
    }
  }
  body {
    margin: 0;
    padding: 0;
  }
  
  table,
  tr,
  td {
    vertical-align: top;
    border-collapse: collapse;
  }
  
  p {
    margin: 0;
  }
  
  .ie-container table,
  .mso-container table {
    table-layout: fixed;
  }
  
  * {
    line-height: inherit;
  }
  
  a[x-apple-data-detectors='true'] {
    color: inherit !important;
    text-decoration: none !important;
  }
  
  table, td { color: #000000; } #u_body a { color: #0000ee; text-decoration: underline; } @media (max-width: 480px) { #u_content_image_1 .v-src-width { width: auto !important; } #u_content_image_1 .v-src-max-width { max-width: 58% !important; } #u_content_text_8 .v-text-align { text-align: center !important; } #u_content_text_9 .v-text-align { text-align: center !important; } #u_content_button_4 .v-text-align { text-align: center !important; } }
      </style>
    
    
  
  <!--[if !mso]><!--><link href="https://fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet" type="text/css"><link href="https://fonts.googleapis.com/css?family=Playfair+Display:400,700" rel="stylesheet" type="text/css"><!--<![endif]-->
  
  </head>
  
  <body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #e8d4bb;color: #000000">
    <!--[if IE]><div class="ie-container"><![endif]-->
    <!--[if mso]><div class="mso-container"><![endif]-->
    <table id="u_body" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #e8d4bb;width:100%" cellpadding="0" cellspacing="0">
    <tbody>
    <tr style="vertical-align: top">
      <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #e8d4bb;"><![endif]-->
      
  
  <div class="u-row-container" style="padding: 0px;background-color: transparent">
    <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
      <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
        
  <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
  <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
    <div style="height: 100%;width: 100% !important;">
    <!--[if (!mso)&(!IE)]><!--><div style="height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
    
  <table style="font-family:'Montserrat',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
    <tbody>
      <tr>
        <td style="overflow-wrap:break-word;word-break:break-word;padding:5px;font-family:'Montserrat',sans-serif;" align="left">
          
    <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 0px solid #BBBBBB;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
      <tbody>
        <tr style="vertical-align: top">
          <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
            <span>&#160;</span>
          </td>
        </tr>
      </tbody>
    </table>
  
        </td>
      </tr>
    </tbody>
  </table>
  
    <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
    </div>
  </div>
  <!--[if (mso)|(IE)]></td><![endif]-->
        <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
      </div>
    </div>
  </div>
  
  
  
  <div class="u-row-container" style="padding: 0px;background-color: transparent">
    <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
      <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
        
  <!--[if (mso)|(IE)]><td align="center" width="200" style="width: 200px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
  <div class="u-col u-col-33p33" style="max-width: 320px;min-width: 200px;display: table-cell;vertical-align: top;">
    <div style="height: 100%;width: 100% !important;">
    <!--[if (!mso)&(!IE)]><!--><div style="height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
    
  <table style="font-family:'Montserrat',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
    <tbody>
      <tr>
        <td style="overflow-wrap:break-word;word-break:break-word;padding:25px 10px 10px;font-family:'Montserrat',sans-serif;" align="left">
          
  <div class="menu" style="text-align:center">
  <!--[if (mso)|(IE)]><table role="presentation" border="0" cellpadding="0" cellspacing="0" align="center"><tr><![endif]-->
  
    <!--[if (mso)|(IE)]><td style="padding:5px 15px"><![endif]-->
    
    <span style="padding:5px 15px;display:inline-block;color:#444444;font-family:'Montserrat',sans-serif;font-size:14px">
      NEWS
    </span>
    
    <!--[if (mso)|(IE)]></td><![endif]-->
    
  
    <!--[if (mso)|(IE)]><td style="padding:5px 15px"><![endif]-->
    
    <span style="padding:5px 15px;display:inline-block;color:#444444;font-family:'Montserrat',sans-serif;font-size:14px">
      SERVICE
    </span>
    
    <!--[if (mso)|(IE)]></td><![endif]-->
    
  
  <!--[if (mso)|(IE)]></tr></table><![endif]-->
  </div>
  
        </td>
      </tr>
    </tbody>
  </table>
  
    <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
    </div>
  </div>
  <!--[if (mso)|(IE)]></td><![endif]-->
  <!--[if (mso)|(IE)]><td align="center" width="200" style="width: 200px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
  <div class="u-col u-col-33p33" style="max-width: 320px;min-width: 200px;display: table-cell;vertical-align: top;">
    <div style="height: 100%;width: 100% !important;">
    <!--[if (!mso)&(!IE)]><!--><div style="height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
    
  <table id="u_content_image_1" style="font-family:'Montserrat',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
    <tbody>
      <tr>
        <td style="overflow-wrap:break-word;word-break:break-word;padding:20px 10px;font-family:'Montserrat',sans-serif;" align="left">
          
  <table width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td class="v-text-align" style="padding-right: 0px;padding-left: 0px;" align="center">
        
        <img align="center" border="0" src="https://cdn.templates.unlayer.com/assets/1606906849237-logo.png" alt="Image" title="Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 77%;max-width: 138.6px;" width="138.6" class="v-src-width v-src-max-width"/>
        
      </td>
    </tr>
  </table>
  
        </td>
      </tr>
    </tbody>
  </table>
  
    <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
    </div>
  </div>
  <!--[if (mso)|(IE)]></td><![endif]-->
  <!--[if (mso)|(IE)]><td align="center" width="200" style="width: 200px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
  <div class="u-col u-col-33p33" style="max-width: 320px;min-width: 200px;display: table-cell;vertical-align: top;">
    <div style="height: 100%;width: 100% !important;">
    <!--[if (!mso)&(!IE)]><!--><div style="height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
    
  <table style="font-family:'Montserrat',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
    <tbody>
      <tr>
        <td style="overflow-wrap:break-word;word-break:break-word;padding:25px 10px 30px;font-family:'Montserrat',sans-serif;" align="left">
          
  <div class="menu" style="text-align:center">
  <!--[if (mso)|(IE)]><table role="presentation" border="0" cellpadding="0" cellspacing="0" align="center"><tr><![endif]-->
  
    <!--[if (mso)|(IE)]><td style="padding:5px 15px"><![endif]-->
    
    <span style="padding:5px 15px;display:inline-block;color:#444444;font-family:'Montserrat',sans-serif;font-size:14px">
      ABOUT
    </span>
    
    <!--[if (mso)|(IE)]></td><![endif]-->
    
  
    <!--[if (mso)|(IE)]><td style="padding:5px 15px"><![endif]-->
    
    <span style="padding:5px 15px;display:inline-block;color:#444444;font-family:'Montserrat',sans-serif;font-size:14px">
      CONTACT
    </span>
    
    <!--[if (mso)|(IE)]></td><![endif]-->
    
  
  <!--[if (mso)|(IE)]></tr></table><![endif]-->
  </div>
  
        </td>
      </tr>
    </tbody>
  </table>
  
    <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
    </div>
  </div>
  <!--[if (mso)|(IE)]></td><![endif]-->
        <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
      </div>
    </div>
  </div>
  
  
  
  <div class="u-row-container" style="padding: 0px;background-color: transparent">
    <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
      <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-image: url('https://cdn.templates.unlayer.com/assets/1606924485372-1.jpg');background-repeat: no-repeat;background-position: center top;background-color: transparent;">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-image: url('https://cdn.templates.unlayer.com/assets/1606924485372-1.jpg');background-repeat: no-repeat;background-position: center top;background-color: transparent;"><![endif]-->
        
  <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
  <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
    <div style="height: 100%;width: 100% !important;">
    <!--[if (!mso)&(!IE)]><!--><div style="height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
    
  <table style="font-family:'Montserrat',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
    <tbody>
      <tr>
        <td style="overflow-wrap:break-word;word-break:break-word;padding:150px 10px 10px;font-family:'Montserrat',sans-serif;" align="left">
          
    <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 0px solid #BBBBBB;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
      <tbody>
        <tr style="vertical-align: top">
          <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
            <span>&#160;</span>
          </td>
        </tr>
      </tbody>
    </table>
  
        </td>
      </tr>
    </tbody>
  </table>
  
  <table style="font-family:'Montserrat',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
    <tbody>
      <tr>
        <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Montserrat',sans-serif;" align="left">
          
    <div class="v-text-align" style="color: #ffffff; line-height: 140%; text-align: center; word-wrap: break-word;">
      <p style="font-size: 14px; line-height: 140%;"><span style="font-family: Montserrat, sans-serif; font-size: 14px; line-height: 19.6px;"><strong><span style="font-size: 44px; line-height: 61.6px;">NEW ARRIVAL</span></strong></span></p>
    </div>
  
        </td>
      </tr>
    </tbody>
  </table>
  
  <table style="font-family:'Montserrat',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
    <tbody>
      <tr>
        <td style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 50px;font-family:'Montserrat',sans-serif;" align="left">
          
  <div class="v-text-align" align="center">
    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;font-family:'Montserrat',sans-serif;"><tr><td class="v-text-align" style="font-family:'Montserrat',sans-serif;" align="center"><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="" style="height:40px; v-text-anchor:middle; width:134px;" arcsize="0%" stroke="f" fillcolor="#ffffff"><w:anchorlock/><center style="color:#463a41;font-family:'Montserrat',sans-serif;"><![endif]-->
      <a href="" target="_blank" style="box-sizing: border-box;display: inline-block;font-family:'Montserrat',sans-serif;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #463a41; background-color: #ffffff; border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px; width:auto; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; mso-border-alt: none;">
        <span style="display:block;padding:12px 22px;line-height:120%;"><strong><span style="font-size: 14px; line-height: 16.8px;">VIEW MORE</span></strong></span>
      </a>
    <!--[if mso]></center></v:roundrect></td></tr></table><![endif]-->
  </div>
  
        </td>
      </tr>
    </tbody>
  </table>
  
    <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
    </div>
  </div>
  <!--[if (mso)|(IE)]></td><![endif]-->
        <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
      </div>
    </div>
  </div>
  
  
  
  <div class="u-row-container" style="padding: 0px;background-color: transparent">
    <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
      <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
        
  <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
  <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
    <div style="height: 100%;width: 100% !important;">
    <!--[if (!mso)&(!IE)]><!--><div style="height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
    
  <table style="font-family:'Montserrat',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
    <tbody>
      <tr>
        <td style="overflow-wrap:break-word;word-break:break-word;padding:40px 10px 10px;font-family:'Montserrat',sans-serif;" align="left">
          
    <div class="v-text-align" style="line-height: 140%; text-align: center; word-wrap: break-word;">
      <p style="line-height: 140%; font-size: 14px;"><span style="line-height: 33.6px; font-size: 24px; font-family: 'Playfair Display', serif;"><span style="line-height: 33.6px; font-size: 24px;"><strong>Purchasing Focal Just got easier</strong></span></span></p>
    </div>
  
        </td>
      </tr>
    </tbody>
  </table>
  
  <table style="font-family:'Montserrat',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
    <tbody>
      <tr>
        <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 40px;font-family:'Montserrat',sans-serif;" align="left">
          
    <div class="v-text-align" style="line-height: 140%; text-align: center; word-wrap: break-word;">
      <p style="font-size: 14px; line-height: 140%;"><span style="font-size: 14px; line-height: 19.6px;">Lorem ipsum dolor sit amet, </span></p>
    </div>
  
        </td>
      </tr>
    </tbody>
  </table>
  
    <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
    </div>
  </div>
  <!--[if (mso)|(IE)]></td><![endif]-->
        <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
      </div>
    </div>
  </div>
  
  
  
  <div class="u-row-container" style="padding: 0px;background-color: transparent">
    <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
      <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
        
  <!--[if (mso)|(IE)]><td align="center" width="300" style="width: 300px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
  <div class="u-col u-col-50" style="max-width: 320px;min-width: 300px;display: table-cell;vertical-align: top;">
    <div style="height: 100%;width: 100% !important;">
    <!--[if (!mso)&(!IE)]><!--><div style="height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
    
  <table style="font-family:'Montserrat',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
    <tbody>
      <tr>
        <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Montserrat',sans-serif;" align="left">
          
  <table width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td class="v-text-align" style="padding-right: 0px;padding-left: 0px;" align="center">
        
        <img align="center" border="0" src="https://cdn.templates.unlayer.com/assets/1606934810497-02.png" alt="Image" title="Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 100%;max-width: 280px;" width="280" class="v-src-width v-src-max-width"/>
        
      </td>
    </tr>
  </table>
  
        </td>
      </tr>
    </tbody>
  </table>
  
  <table style="font-family:'Montserrat',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
    <tbody>
      <tr>
        <td style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 0px;font-family:'Montserrat',sans-serif;" align="left">
          
    <div class="v-text-align" style="line-height: 140%; text-align: center; word-wrap: break-word;">
      <p style="font-size: 14px; line-height: 140%;"><span style="font-size: 16px; line-height: 22.4px;"><strong><span style="line-height: 22.4px; font-size: 16px;">Ray-Ban</span></strong></span></p>
    </div>
  
        </td>
      </tr>
    </tbody>
  </table>
  
  <table style="font-family:'Montserrat',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
    <tbody>
      <tr>
        <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Montserrat',sans-serif;" align="left">
          
    <div class="v-text-align" style="line-height: 140%; text-align: center; word-wrap: break-word;">
      <p style="font-size: 14px; line-height: 140%;"><span style="font-size: 16px; line-height: 22.4px;"><strong><span style="line-height: 22.4px; font-size: 16px;">$20</span></strong></span></p>
    </div>
  
        </td>
      </tr>
    </tbody>
  </table>
  
  <table style="font-family:'Montserrat',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
    <tbody>
      <tr>
        <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Montserrat',sans-serif;" align="left">
          
  <div class="v-text-align" align="center">
    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;font-family:'Montserrat',sans-serif;"><tr><td class="v-text-align" style="font-family:'Montserrat',sans-serif;" align="center"><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="" style="height:36px; v-text-anchor:middle; width:104px;" arcsize="0%" stroke="f" fillcolor="#262425"><w:anchorlock/><center style="color:#FFFFFF;font-family:'Montserrat',sans-serif;"><![endif]-->
      <a href="" target="_blank" style="box-sizing: border-box;display: inline-block;font-family:'Montserrat',sans-serif;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #FFFFFF; background-color: #262425; border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px; width:auto; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; mso-border-alt: none;">
        <span style="display:block;padding:10px 20px;line-height:120%;"><span style="font-size: 14px; line-height: 16.8px;">Buy Now</span></span>
      </a>
    <!--[if mso]></center></v:roundrect></td></tr></table><![endif]-->
  </div>
  
        </td>
      </tr>
    </tbody>
  </table>
  
    <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
    </div>
  </div>
  <!--[if (mso)|(IE)]></td><![endif]-->
  <!--[if (mso)|(IE)]><td align="center" width="300" style="width: 300px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
  <div class="u-col u-col-50" style="max-width: 320px;min-width: 300px;display: table-cell;vertical-align: top;">
    <div style="height: 100%;width: 100% !important;">
    <!--[if (!mso)&(!IE)]><!--><div style="height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
    
  <table style="font-family:'Montserrat',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
    <tbody>
      <tr>
        <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Montserrat',sans-serif;" align="left">
          
  <table width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td class="v-text-align" style="padding-right: 0px;padding-left: 0px;" align="center">
        
        <img align="center" border="0" src="https://cdn.templates.unlayer.com/assets/1606932761674-2.jpg" alt="Image" title="Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 100%;max-width: 280px;" width="280" class="v-src-width v-src-max-width"/>
        
      </td>
    </tr>
  </table>
  
        </td>
      </tr>
    </tbody>
  </table>
  
  <table style="font-family:'Montserrat',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
    <tbody>
      <tr>
        <td style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 0px;font-family:'Montserrat',sans-serif;" align="left">
          
    <div class="v-text-align" style="line-height: 140%; text-align: center; word-wrap: break-word;">
      <p style="font-size: 14px; line-height: 140%;"><span style="font-size: 16px; line-height: 22.4px;"><strong><span style="line-height: 22.4px; font-size: 16px;">Ray-Ban</span></strong></span></p>
    </div>
  
        </td>
      </tr>
    </tbody>
  </table>
  
  <table style="font-family:'Montserrat',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
    <tbody>
      <tr>
        <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Montserrat',sans-serif;" align="left">
          
    <div class="v-text-align" style="line-height: 140%; text-align: center; word-wrap: break-word;">
      <p style="font-size: 14px; line-height: 140%;"><span style="font-size: 16px; line-height: 22.4px;"><strong><span style="line-height: 22.4px; font-size: 16px;">$25</span></strong></span></p>
    </div>
  
        </td>
      </tr>
    </tbody>
  </table>
  
  <table style="font-family:'Montserrat',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
    <tbody>
      <tr>
        <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Montserrat',sans-serif;" align="left">
          
  <div class="v-text-align" align="center">
    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;font-family:'Montserrat',sans-serif;"><tr><td class="v-text-align" style="font-family:'Montserrat',sans-serif;" align="center"><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="" style="height:36px; v-text-anchor:middle; width:104px;" arcsize="0%" stroke="f" fillcolor="#262425"><w:anchorlock/><center style="color:#FFFFFF;font-family:'Montserrat',sans-serif;"><![endif]-->
      <a href="" target="_blank" style="box-sizing: border-box;display: inline-block;font-family:'Montserrat',sans-serif;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #FFFFFF; background-color: #262425; border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px; width:auto; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; mso-border-alt: none;">
        <span style="display:block;padding:10px 20px;line-height:120%;"><span style="font-size: 14px; line-height: 16.8px;">Buy Now</span></span>
      </a>
    <!--[if mso]></center></v:roundrect></td></tr></table><![endif]-->
  </div>
  
        </td>
      </tr>
    </tbody>
  </table>
  
    <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
    </div>
  </div>
  <!--[if (mso)|(IE)]></td><![endif]-->
        <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
      </div>
    </div>
  </div>
  
  
  
  <div class="u-row-container" style="padding: 0px;background-color: transparent">
    <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
      <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
        
  <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
  <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
    <div style="height: 100%;width: 100% !important;">
    <!--[if (!mso)&(!IE)]><!--><div style="height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
    
  <table style="font-family:'Montserrat',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
    <tbody>
      <tr>
        <td style="overflow-wrap:break-word;word-break:break-word;padding:30px 30px 40px;font-family:'Montserrat',sans-serif;" align="left">
          
    <div class="v-text-align" style="line-height: 160%; text-align: center; word-wrap: break-word;">
      <p style="font-size: 14px; line-height: 160%;"><span style="font-size: 14px; line-height: 22.4px;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </span></p>
    </div>
  
        </td>
      </tr>
    </tbody>
  </table>
  
    <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
    </div>
  </div>
  <!--[if (mso)|(IE)]></td><![endif]-->
        <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
      </div>
    </div>
  </div>
  
  
  
  <div class="u-row-container" style="padding: 0px;background-color: transparent">
    <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
      <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-image: url('https://cdn.templates.unlayer.com/assets/1606937518713-ASASS.png');background-repeat: no-repeat;background-position: center top;background-color: transparent;">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-image: url('https://cdn.templates.unlayer.com/assets/1606937518713-ASASS.png');background-repeat: no-repeat;background-position: center top;background-color: transparent;"><![endif]-->
        
  <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
  <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
    <div style="height: 100%;width: 100% !important;">
    <!--[if (!mso)&(!IE)]><!--><div style="height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
    
  <table id="u_content_text_8" style="font-family:'Montserrat',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
    <tbody>
      <tr>
        <td style="overflow-wrap:break-word;word-break:break-word;padding:60px 30px 0px;font-family:'Montserrat',sans-serif;" align="left">
          
    <div class="v-text-align" style="color: #ffffff; line-height: 120%; text-align: left; word-wrap: break-word;">
      <p style="font-size: 14px; line-height: 120%;"><span style="font-size: 32px; line-height: 38.4px;"><strong><span style="line-height: 38.4px; font-size: 32px;">ABOUT OUR</span></strong></span></p>
  <p style="font-size: 14px; line-height: 120%;"><span style="font-size: 32px; line-height: 38.4px;"><strong><span style="line-height: 38.4px; font-size: 32px;"> PRODUCT</span></strong></span></p>
    </div>
  
        </td>
      </tr>
    </tbody>
  </table>
  
  <table id="u_content_text_9" style="font-family:'Montserrat',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
    <tbody>
      <tr>
        <td style="overflow-wrap:break-word;word-break:break-word;padding:22px 30px 10px;font-family:'Montserrat',sans-serif;" align="left">
          
    <div class="v-text-align" style="color: #ffffff; line-height: 140%; text-align: left; word-wrap: break-word;">
      <p style="font-size: 14px; line-height: 140%;"><span style="font-size: 14px; line-height: 19.6px;">Lorem ipsum dolor sit amet, consectetur </span></p>
  <p style="font-size: 14px; line-height: 140%;"><span style="font-size: 14px; line-height: 19.6px;">adipiscing elit, sed do eiusmod tempor </span></p>
  <p style="font-size: 14px; line-height: 140%;"><span style="font-size: 14px; line-height: 19.6px;">incididunt ut labore et dolore magna </span></p>
  <p style="font-size: 14px; line-height: 140%;"><span style="font-size: 14px; line-height: 19.6px;"><span style="line-height: 19.6px; font-size: 14px;">aliqua.</span><span style="line-height: 19.6px; font-size: 14px;">enim ad minim veniam, quis nostrud </span></span></p>
  <p style="font-size: 14px; line-height: 140%;"><span style="font-size: 14px; line-height: 19.6px;"><span style="line-height: 19.6px; font-size: 14px;">exercitation ullamco</span><span style="line-height: 19.6px; font-size: 14px;">&nbsp;</span></span></p>
    </div>
  
        </td>
      </tr>
    </tbody>
  </table>
  
  <table id="u_content_button_4" style="font-family:'Montserrat',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
    <tbody>
      <tr>
        <td style="overflow-wrap:break-word;word-break:break-word;padding:10px 30px 40px;font-family:'Montserrat',sans-serif;" align="left">
          
  <div class="v-text-align" align="left">
    <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;font-family:'Montserrat',sans-serif;"><tr><td class="v-text-align" style="font-family:'Montserrat',sans-serif;" align="left"><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="" style="height:40px; v-text-anchor:middle; width:139px;" arcsize="0%" stroke="f" fillcolor="#ffffff"><w:anchorlock/><center style="color:#252324;font-family:'Montserrat',sans-serif;"><![endif]-->
      <a href="" target="_blank" style="box-sizing: border-box;display: inline-block;font-family:'Montserrat',sans-serif;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #252324; background-color: #ffffff; border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px; width:auto; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; mso-border-alt: none;">
        <span style="display:block;padding:12px 25px;line-height:120%;"><strong><span style="font-size: 14px; line-height: 16.8px;">VIEW MORE</span></strong></span>
      </a>
    <!--[if mso]></center></v:roundrect></td></tr></table><![endif]-->
  </div>
  
        </td>
      </tr>
    </tbody>
  </table>
  
    <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
    </div>
  </div>
  <!--[if (mso)|(IE)]></td><![endif]-->
        <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
      </div>
    </div>
  </div>
  
  
  
  <div class="u-row-container" style="padding: 0px;background-color: transparent">
    <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
      <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
        
  <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
  <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
    <div style="height: 100%;width: 100% !important;">
    <!--[if (!mso)&(!IE)]><!--><div style="height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
    
  <table style="font-family:'Montserrat',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
    <tbody>
      <tr>
        <td style="overflow-wrap:break-word;word-break:break-word;padding:15px;font-family:'Montserrat',sans-serif;" align="left">
          
    <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 0px solid #BBBBBB;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
      <tbody>
        <tr style="vertical-align: top">
          <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
            <span>&#160;</span>
          </td>
        </tr>
      </tbody>
    </table>
  
        </td>
      </tr>
    </tbody>
  </table>
  
    <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
    </div>
  </div>
  <!--[if (mso)|(IE)]></td><![endif]-->
        <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
      </div>
    </div>
  </div>
  
  
  
  <div class="u-row-container" style="padding: 0px;background-color: transparent">
    <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #d4ae7f;">
      <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #d4ae7f;"><![endif]-->
        
  <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
  <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
    <div style="height: 100%;width: 100% !important;">
    <!--[if (!mso)&(!IE)]><!--><div style="height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
    
  <table style="font-family:'Montserrat',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
    <tbody>
      <tr>
        <td style="overflow-wrap:break-word;word-break:break-word;padding:20px 10px 10px;font-family:'Montserrat',sans-serif;" align="left">
          
    <div class="v-text-align" style="color: #ffffff; line-height: 140%; text-align: center; word-wrap: break-word;">
      <p style="font-size: 14px; line-height: 140%;"><span style="font-size: 14px; line-height: 19.6px; font-family: Montserrat, sans-serif;"><strong><span style="line-height: 19.6px; font-size: 14px;">FOLLOW&nbsp; US&nbsp; ON</span></strong></span></p>
    </div>
  
        </td>
      </tr>
    </tbody>
  </table>
  
  <table style="font-family:'Montserrat',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
    <tbody>
      <tr>
        <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 20px;font-family:'Montserrat',sans-serif;" align="left">
          
  <div align="center">
    <div style="display: table; max-width:125px;">
    <!--[if (mso)|(IE)]><table width="125" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-collapse:collapse;" align="center"><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; mso-table-lspace: 0pt;mso-table-rspace: 0pt; width:125px;"><tr><![endif]-->
    
      
      <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 10px;" valign="top"><![endif]-->
      <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 10px">
        <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
          <a href="https://facebook.com/" title="Facebook" target="_blank">
            <img src="https://cdn.tools.unlayer.com/social/icons/circle-white/facebook.png" alt="Facebook" title="Facebook" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
          </a>
        </td></tr>
      </tbody></table>
      <!--[if (mso)|(IE)]></td><![endif]-->
      
      <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 10px;" valign="top"><![endif]-->
      <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 10px">
        <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
          <a href="https://instagram.com/" title="Instagram" target="_blank">
            <img src="https://cdn.tools.unlayer.com/social/icons/circle-white/instagram.png" alt="Instagram" title="Instagram" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
          </a>
        </td></tr>
      </tbody></table>
      <!--[if (mso)|(IE)]></td><![endif]-->
      
      <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 0px;" valign="top"><![endif]-->
      <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 0px">
        <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
          <a href="https://twitter.com/" title="Twitter" target="_blank">
            <img src="https://cdn.tools.unlayer.com/social/icons/circle-white/twitter.png" alt="Twitter" title="Twitter" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
          </a>
        </td></tr>
      </tbody></table>
      <!--[if (mso)|(IE)]></td><![endif]-->
      
      
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
  
        </td>
      </tr>
    </tbody>
  </table>
  
    <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
    </div>
  </div>
  <!--[if (mso)|(IE)]></td><![endif]-->
        <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
      </div>
    </div>
  </div>
  
  
  
  <div class="u-row-container" style="padding: 0px;background-color: transparent">
    <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
      <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
        
  <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
  <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
    <div style="height: 100%;width: 100% !important;">
    <!--[if (!mso)&(!IE)]><!--><div style="height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
    
  <table style="font-family:'Montserrat',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
    <tbody>
      <tr>
        <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Montserrat',sans-serif;" align="left">
          
    <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 0px solid #BBBBBB;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
      <tbody>
        <tr style="vertical-align: top">
          <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
            <span>&#160;</span>
          </td>
        </tr>
      </tbody>
    </table>
  
        </td>
      </tr>
    </tbody>
  </table>
  
    <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
    </div>
  </div>
  <!--[if (mso)|(IE)]></td><![endif]-->
        <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
      </div>
    </div>
  </div>
  
  
      <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
      </td>
    </tr>
    </tbody>
    </table>
    <!--[if mso]></div><![endif]-->
    <!--[if IE]></div><![endif]-->
  </body>
  
  </html>
  `;
    const pdfObject = {
        counters: {
            u_row: 13,
            u_column: 16,
            u_content_menu: 3,
            u_content_text: 11,
            u_content_image: 3,
            u_content_button: 4,
            u_content_social: 1,
            u_content_divider: 6,
        },
        body: {
            id: 'vQFjJtGKbF',
            rows: [
                {
                    id: 'tOpezgYfPj',
                    cells: [1],
                    columns: [
                        {
                            id: '6ROpqM1F_Z',
                            contents: [
                                {
                                    id: 'Vrk-4-a4An',
                                    type: 'divider',
                                    values: {
                                        width: '100%',
                                        border: {
                                            borderTopWidth: '0px',
                                            borderTopStyle: 'solid',
                                            borderTopColor: '#BBBBBB',
                                        },
                                        textAlign: 'center',
                                        containerPadding: '5px',
                                        anchor: '',
                                        hideDesktop: false,
                                        displayCondition: null,
                                        _meta: {
                                            htmlID: 'u_content_divider_6',
                                            htmlClassNames: 'u_content_divider',
                                        },
                                        selectable: true,
                                        draggable: true,
                                        duplicatable: true,
                                        deletable: true,
                                        hideable: true,
                                        hideMobile: false,
                                    },
                                },
                            ],
                            values: {
                                _meta: {
                                    htmlID: 'u_column_16',
                                    htmlClassNames: 'u_column',
                                },
                                border: {},
                                padding: '0px',
                                backgroundColor: '',
                            },
                        },
                    ],
                    values: {
                        displayCondition: null,
                        columns: false,
                        backgroundColor: '',
                        columnsBackgroundColor: '',
                        backgroundImage: {
                            url: '',
                            fullWidth: true,
                            repeat: false,
                            center: true,
                            cover: false,
                        },
                        padding: '0px',
                        anchor: '',
                        hideDesktop: false,
                        _meta: {
                            htmlID: 'u_row_13',
                            htmlClassNames: 'u_row',
                        },
                        selectable: true,
                        draggable: true,
                        duplicatable: true,
                        deletable: true,
                        hideable: true,
                        hideMobile: false,
                        noStackMobile: false,
                    },
                },
                {
                    id: 'tkHvxnNzBx',
                    cells: [1, 1, 1],
                    columns: [
                        {
                            id: 'jcPUtlDFTc',
                            contents: [
                                {
                                    id: 'DJD7JR-9cf',
                                    type: 'menu',
                                    values: {
                                        containerPadding: '25px 10px 10px',
                                        anchor: '',
                                        menu: {
                                            items: [
                                                {
                                                    key: '1606923979328',
                                                    link: {
                                                        name: 'web',
                                                        values: {
                                                            href: '',
                                                            target: '_self',
                                                        },
                                                    },
                                                    text: 'NEWS',
                                                },
                                                {
                                                    key: '1606924033905',
                                                    link: {
                                                        name: 'web',
                                                        values: {
                                                            href: '',
                                                            target: '_self',
                                                        },
                                                    },
                                                    text: 'SERVICE',
                                                },
                                            ],
                                        },
                                        fontFamily: {
                                            label: 'Montserrat',
                                            value: "'Montserrat',sans-serif",
                                            url: 'https://fonts.googleapis.com/css?family=Montserrat:400,700',
                                            defaultFont: true,
                                        },
                                        fontSize: '14px',
                                        textColor: '#444444',
                                        linkColor: '#0068A5',
                                        align: 'center',
                                        layout: 'horizontal',
                                        separator: '',
                                        padding: '5px 15px',
                                        hideDesktop: false,
                                        displayCondition: null,
                                        _meta: {
                                            htmlID: 'u_content_menu_3',
                                            htmlClassNames: 'u_content_menu',
                                        },
                                        selectable: true,
                                        draggable: true,
                                        duplicatable: true,
                                        deletable: true,
                                        hideable: true,
                                        hideMobile: false,
                                    },
                                },
                            ],
                            values: {
                                _meta: {
                                    htmlID: 'u_column_1',
                                    htmlClassNames: 'u_column',
                                },
                                border: {},
                                padding: '0px',
                                backgroundColor: '',
                            },
                        },
                        {
                            id: 'gE0tuWNyA2',
                            contents: [
                                {
                                    id: '2BrKfRmcag',
                                    type: 'image',
                                    values: {
                                        containerPadding: '20px 10px',
                                        anchor: '',
                                        src: {
                                            url: 'https://cdn.templates.unlayer.com/assets/1606906849237-logo.png',
                                            width: 248,
                                            height: 56,
                                            maxWidth: '77%',
                                            autoWidth: false,
                                        },
                                        textAlign: 'center',
                                        altText: 'Image',
                                        action: {
                                            name: 'web',
                                            values: {
                                                href: '',
                                                target: '_blank',
                                            },
                                        },
                                        hideDesktop: false,
                                        displayCondition: null,
                                        _meta: {
                                            htmlID: 'u_content_image_1',
                                            htmlClassNames: 'u_content_image',
                                        },
                                        selectable: true,
                                        draggable: true,
                                        duplicatable: true,
                                        deletable: true,
                                        hideable: true,
                                        hideMobile: false,
                                        _override: {
                                            mobile: {
                                                src: {
                                                    maxWidth: '58%',
                                                    autoWidth: false,
                                                },
                                            },
                                        },
                                    },
                                },
                            ],
                            values: {
                                _meta: {
                                    htmlID: 'u_column_2',
                                    htmlClassNames: 'u_column',
                                },
                                border: {},
                                padding: '0px',
                                backgroundColor: '',
                            },
                        },
                        {
                            id: 'lAOK0OQwxT',
                            contents: [
                                {
                                    id: 'h7Ff5zsLvQ',
                                    type: 'menu',
                                    values: {
                                        containerPadding: '25px 10px 30px',
                                        anchor: '',
                                        menu: {
                                            items: [
                                                {
                                                    key: '1606923979328',
                                                    link: {
                                                        name: 'web',
                                                        values: {
                                                            href: '',
                                                            target: '_self',
                                                        },
                                                    },
                                                    text: 'ABOUT',
                                                },
                                                {
                                                    key: '1606924033905',
                                                    link: {
                                                        name: 'web',
                                                        values: {
                                                            href: '',
                                                            target: '_self',
                                                        },
                                                    },
                                                    text: 'CONTACT',
                                                },
                                            ],
                                        },
                                        fontFamily: {
                                            label: 'Montserrat',
                                            value: "'Montserrat',sans-serif",
                                            url: 'https://fonts.googleapis.com/css?family=Montserrat:400,700',
                                            defaultFont: true,
                                        },
                                        fontSize: '14px',
                                        textColor: '#444444',
                                        linkColor: '#0068A5',
                                        align: 'center',
                                        layout: 'horizontal',
                                        separator: '',
                                        padding: '5px 15px',
                                        hideDesktop: false,
                                        displayCondition: null,
                                        _meta: {
                                            htmlID: 'u_content_menu_2',
                                            htmlClassNames: 'u_content_menu',
                                        },
                                        selectable: true,
                                        draggable: true,
                                        duplicatable: true,
                                        deletable: true,
                                        hideable: true,
                                        hideMobile: false,
                                    },
                                },
                            ],
                            values: {
                                _meta: {
                                    htmlID: 'u_column_3',
                                    htmlClassNames: 'u_column',
                                },
                                border: {},
                                padding: '0px',
                                backgroundColor: '',
                            },
                        },
                    ],
                    values: {
                        displayCondition: null,
                        columns: false,
                        backgroundColor: '',
                        columnsBackgroundColor: '#ffffff',
                        backgroundImage: {
                            url: '',
                            fullWidth: true,
                            repeat: false,
                            center: true,
                            cover: false,
                        },
                        padding: '0px',
                        anchor: '',
                        hideDesktop: false,
                        _meta: {
                            htmlID: 'u_row_1',
                            htmlClassNames: 'u_row',
                        },
                        selectable: true,
                        draggable: true,
                        duplicatable: true,
                        deletable: true,
                        hideable: true,
                        hideMobile: false,
                        noStackMobile: false,
                    },
                },
                {
                    id: 'PLGK5slzga',
                    cells: [1],
                    columns: [
                        {
                            id: 'OKPAgpEw7c',
                            contents: [
                                {
                                    id: '2dbGN8Llmi',
                                    type: 'divider',
                                    values: {
                                        width: '100%',
                                        border: {
                                            borderTopWidth: '0px',
                                            borderTopStyle: 'solid',
                                            borderTopColor: '#BBBBBB',
                                        },
                                        textAlign: 'center',
                                        containerPadding: '150px 10px 10px',
                                        anchor: '',
                                        hideDesktop: false,
                                        displayCondition: null,
                                        _meta: {
                                            htmlID: 'u_content_divider_2',
                                            htmlClassNames: 'u_content_divider',
                                        },
                                        selectable: true,
                                        draggable: true,
                                        duplicatable: true,
                                        deletable: true,
                                        hideable: true,
                                        hideMobile: false,
                                    },
                                },
                                {
                                    id: 'zGQKysUXa6',
                                    type: 'text',
                                    values: {
                                        containerPadding: '10px',
                                        anchor: '',
                                        color: '#ffffff',
                                        textAlign: 'center',
                                        lineHeight: '140%',
                                        linkStyle: {
                                            inherit: true,
                                            linkColor: '#0000ee',
                                            linkHoverColor: '#0000ee',
                                            linkUnderline: true,
                                            linkHoverUnderline: true,
                                        },
                                        hideDesktop: false,
                                        displayCondition: null,
                                        _meta: {
                                            htmlID: 'u_content_text_1',
                                            htmlClassNames: 'u_content_text',
                                        },
                                        selectable: true,
                                        draggable: true,
                                        duplicatable: true,
                                        deletable: true,
                                        hideable: true,
                                        hideMobile: false,
                                        text: '<p style="font-size: 14px; line-height: 140%;"><span style="font-family: Montserrat, sans-serif; font-size: 14px; line-height: 19.6px;"><strong><span style="font-size: 44px; line-height: 61.6px;">NEW ARRIVAL</span></strong></span></p>',
                                    },
                                },
                                {
                                    id: 'qC7qZ81IUa',
                                    type: 'button',
                                    values: {
                                        containerPadding: '10px 10px 50px',
                                        anchor: '',
                                        href: {
                                            name: 'web',
                                            values: {
                                                href: '',
                                                target: '_blank',
                                            },
                                        },
                                        buttonColors: {
                                            color: '#463a41',
                                            backgroundColor: '#ffffff',
                                            hoverColor: '#FFFFFF',
                                            hoverBackgroundColor: '#3AAEE0',
                                        },
                                        size: {
                                            autoWidth: true,
                                            width: '100%',
                                        },
                                        textAlign: 'center',
                                        lineHeight: '120%',
                                        padding: '12px 22px',
                                        border: {},
                                        borderRadius: '0px',
                                        hideDesktop: false,
                                        displayCondition: null,
                                        _meta: {
                                            htmlID: 'u_content_button_1',
                                            htmlClassNames: 'u_content_button',
                                        },
                                        selectable: true,
                                        draggable: true,
                                        duplicatable: true,
                                        deletable: true,
                                        hideable: true,
                                        hideMobile: false,
                                        text: '<strong><span style="font-size: 14px; line-height: 16.8px;">VIEW MORE</span></strong>',
                                        calculatedWidth: 134,
                                        calculatedHeight: 40,
                                    },
                                },
                            ],
                            values: {
                                _meta: {
                                    htmlID: 'u_column_5',
                                    htmlClassNames: 'u_column',
                                },
                                border: {},
                                padding: '0px',
                                backgroundColor: '',
                            },
                        },
                    ],
                    values: {
                        displayCondition: null,
                        columns: false,
                        backgroundColor: '',
                        columnsBackgroundColor: '',
                        backgroundImage: {
                            url: 'https://cdn.templates.unlayer.com/assets/1606924485372-1.jpg',
                            fullWidth: false,
                            repeat: false,
                            center: true,
                            cover: false,
                            width: 626,
                            height: 500,
                        },
                        padding: '0px',
                        anchor: '',
                        hideDesktop: false,
                        _meta: {
                            htmlID: 'u_row_3',
                            htmlClassNames: 'u_row',
                        },
                        selectable: true,
                        draggable: true,
                        duplicatable: true,
                        deletable: true,
                        hideable: true,
                        hideMobile: false,
                        noStackMobile: false,
                    },
                },
                {
                    id: 'uYkT3VBOjG',
                    cells: [1],
                    columns: [
                        {
                            id: 'nox-fVULce',
                            contents: [
                                {
                                    id: 'oVZxzpHYep',
                                    type: 'text',
                                    values: {
                                        containerPadding: '40px 10px 10px',
                                        anchor: '',
                                        textAlign: 'center',
                                        lineHeight: '140%',
                                        linkStyle: {
                                            inherit: true,
                                            linkColor: '#0000ee',
                                            linkHoverColor: '#0000ee',
                                            linkUnderline: true,
                                            linkHoverUnderline: true,
                                        },
                                        hideDesktop: false,
                                        displayCondition: null,
                                        _meta: {
                                            htmlID: 'u_content_text_2',
                                            htmlClassNames: 'u_content_text',
                                        },
                                        selectable: true,
                                        draggable: true,
                                        duplicatable: true,
                                        deletable: true,
                                        hideable: true,
                                        hideMobile: false,
                                        text: '<p style="line-height: 140%; font-size: 14px;"><span style="line-height: 33.6px; font-size: 24px; font-family: \'Playfair Display\', serif;"><span style="line-height: 33.6px; font-size: 24px;"><strong>Purchasing Focal Just got easier</strong></span></span></p>',
                                    },
                                },
                                {
                                    id: '3rV2cfJvO1',
                                    type: 'text',
                                    values: {
                                        containerPadding: '0px 10px 40px',
                                        anchor: '',
                                        textAlign: 'center',
                                        lineHeight: '140%',
                                        linkStyle: {
                                            inherit: true,
                                            linkColor: '#0000ee',
                                            linkHoverColor: '#0000ee',
                                            linkUnderline: true,
                                            linkHoverUnderline: true,
                                        },
                                        hideDesktop: false,
                                        displayCondition: null,
                                        _meta: {
                                            htmlID: 'u_content_text_11',
                                            htmlClassNames: 'u_content_text',
                                        },
                                        selectable: true,
                                        draggable: true,
                                        duplicatable: true,
                                        deletable: true,
                                        hideable: true,
                                        hideMobile: false,
                                        text: '<p style="font-size: 14px; line-height: 140%;"><span style="font-size: 14px; line-height: 19.6px;">Lorem ipsum dolor sit amet,&nbsp;</span></p>',
                                    },
                                },
                            ],
                            values: {
                                _meta: {
                                    htmlID: 'u_column_7',
                                    htmlClassNames: 'u_column',
                                },
                                border: {},
                                padding: '0px',
                                backgroundColor: '',
                            },
                        },
                    ],
                    values: {
                        displayCondition: null,
                        columns: false,
                        backgroundColor: '',
                        columnsBackgroundColor: '#ffffff',
                        backgroundImage: {
                            url: '',
                            fullWidth: true,
                            repeat: false,
                            center: true,
                            cover: false,
                        },
                        padding: '0px',
                        anchor: '',
                        hideDesktop: false,
                        _meta: {
                            htmlID: 'u_row_5',
                            htmlClassNames: 'u_row',
                        },
                        selectable: true,
                        draggable: true,
                        duplicatable: true,
                        deletable: true,
                        hideable: true,
                        hideMobile: false,
                        noStackMobile: false,
                    },
                },
                {
                    id: '745WDOtWxL',
                    cells: [1, 1],
                    columns: [
                        {
                            id: '1u8s8mWWSg',
                            contents: [
                                {
                                    id: '7G7AZkl93z',
                                    type: 'image',
                                    values: {
                                        containerPadding: '10px',
                                        anchor: '',
                                        src: {
                                            url: 'https://cdn.templates.unlayer.com/assets/1606934810497-02.png',
                                            width: 626,
                                            height: 418,
                                        },
                                        textAlign: 'center',
                                        altText: 'Image',
                                        action: {
                                            name: 'web',
                                            values: {
                                                href: '',
                                                target: '_blank',
                                            },
                                        },
                                        hideDesktop: false,
                                        displayCondition: null,
                                        _meta: {
                                            htmlID: 'u_content_image_3',
                                            htmlClassNames: 'u_content_image',
                                        },
                                        selectable: true,
                                        draggable: true,
                                        duplicatable: true,
                                        deletable: true,
                                        hideable: true,
                                        hideMobile: false,
                                    },
                                },
                                {
                                    id: 'deiZln6_LE',
                                    type: 'text',
                                    values: {
                                        containerPadding: '10px 10px 0px',
                                        anchor: '',
                                        textAlign: 'center',
                                        lineHeight: '140%',
                                        linkStyle: {
                                            inherit: true,
                                            linkColor: '#0000ee',
                                            linkHoverColor: '#0000ee',
                                            linkUnderline: true,
                                            linkHoverUnderline: true,
                                        },
                                        hideDesktop: false,
                                        displayCondition: null,
                                        _meta: {
                                            htmlID: 'u_content_text_3',
                                            htmlClassNames: 'u_content_text',
                                        },
                                        selectable: true,
                                        draggable: true,
                                        duplicatable: true,
                                        deletable: true,
                                        hideable: true,
                                        hideMobile: false,
                                        text: '<p style="font-size: 14px; line-height: 140%;"><span style="font-size: 16px; line-height: 22.4px;"><strong><span style="line-height: 22.4px; font-size: 16px;">Ray-Ban</span></strong></span></p>',
                                    },
                                },
                                {
                                    id: '5ukERnukKi',
                                    type: 'text',
                                    values: {
                                        containerPadding: '10px',
                                        anchor: '',
                                        textAlign: 'center',
                                        lineHeight: '140%',
                                        linkStyle: {
                                            inherit: true,
                                            linkColor: '#0000ee',
                                            linkHoverColor: '#0000ee',
                                            linkUnderline: true,
                                            linkHoverUnderline: true,
                                        },
                                        hideDesktop: false,
                                        displayCondition: null,
                                        _meta: {
                                            htmlID: 'u_content_text_4',
                                            htmlClassNames: 'u_content_text',
                                        },
                                        selectable: true,
                                        draggable: true,
                                        duplicatable: true,
                                        deletable: true,
                                        hideable: true,
                                        hideMobile: false,
                                        text: '<p style="font-size: 14px; line-height: 140%;"><span style="font-size: 16px; line-height: 22.4px;"><strong><span style="line-height: 22.4px; font-size: 16px;">$20</span></strong></span></p>',
                                    },
                                },
                                {
                                    id: 'XaCmrOYKsG',
                                    type: 'button',
                                    values: {
                                        containerPadding: '10px',
                                        anchor: '',
                                        href: {
                                            name: 'web',
                                            values: {
                                                href: '',
                                                target: '_blank',
                                            },
                                        },
                                        buttonColors: {
                                            color: '#FFFFFF',
                                            backgroundColor: '#262425',
                                            hoverColor: '#FFFFFF',
                                            hoverBackgroundColor: '#3AAEE0',
                                        },
                                        size: {
                                            autoWidth: true,
                                            width: '100%',
                                        },
                                        textAlign: 'center',
                                        lineHeight: '120%',
                                        padding: '10px 20px',
                                        border: {},
                                        borderRadius: '0px',
                                        hideDesktop: false,
                                        displayCondition: null,
                                        _meta: {
                                            htmlID: 'u_content_button_2',
                                            htmlClassNames: 'u_content_button',
                                        },
                                        selectable: true,
                                        draggable: true,
                                        duplicatable: true,
                                        deletable: true,
                                        hideable: true,
                                        hideMobile: false,
                                        text: '<span style="font-size: 14px; line-height: 16.8px;">Buy Now</span>',
                                        calculatedWidth: 104,
                                        calculatedHeight: 36,
                                    },
                                },
                            ],
                            values: {
                                _meta: {
                                    htmlID: 'u_column_6',
                                    htmlClassNames: 'u_column',
                                },
                                border: {},
                                padding: '0px',
                                backgroundColor: '',
                            },
                        },
                        {
                            id: '24PT3Ah2vk',
                            contents: [
                                {
                                    id: '0waVLfQNzM',
                                    type: 'image',
                                    values: {
                                        containerPadding: '10px',
                                        anchor: '',
                                        src: {
                                            url: 'https://cdn.templates.unlayer.com/assets/1606932761674-2.jpg',
                                            width: 626,
                                            height: 417,
                                        },
                                        textAlign: 'center',
                                        altText: 'Image',
                                        action: {
                                            name: 'web',
                                            values: {
                                                href: '',
                                                target: '_blank',
                                            },
                                        },
                                        hideDesktop: false,
                                        displayCondition: null,
                                        _meta: {
                                            htmlID: 'u_content_image_2',
                                            htmlClassNames: 'u_content_image',
                                        },
                                        selectable: true,
                                        draggable: true,
                                        duplicatable: true,
                                        deletable: true,
                                        hideable: true,
                                        hideMobile: false,
                                    },
                                },
                                {
                                    id: 'w9L9W7nYlo',
                                    type: 'text',
                                    values: {
                                        containerPadding: '10px 10px 0px',
                                        anchor: '',
                                        textAlign: 'center',
                                        lineHeight: '140%',
                                        linkStyle: {
                                            inherit: true,
                                            linkColor: '#0000ee',
                                            linkHoverColor: '#0000ee',
                                            linkUnderline: true,
                                            linkHoverUnderline: true,
                                        },
                                        hideDesktop: false,
                                        displayCondition: null,
                                        _meta: {
                                            htmlID: 'u_content_text_5',
                                            htmlClassNames: 'u_content_text',
                                        },
                                        selectable: true,
                                        draggable: true,
                                        duplicatable: true,
                                        deletable: true,
                                        hideable: true,
                                        hideMobile: false,
                                        text: '<p style="font-size: 14px; line-height: 140%;"><span style="font-size: 16px; line-height: 22.4px;"><strong><span style="line-height: 22.4px; font-size: 16px;">Ray-Ban</span></strong></span></p>',
                                    },
                                },
                                {
                                    id: '7Cqk0GhlnW',
                                    type: 'text',
                                    values: {
                                        containerPadding: '10px',
                                        anchor: '',
                                        textAlign: 'center',
                                        lineHeight: '140%',
                                        linkStyle: {
                                            inherit: true,
                                            linkColor: '#0000ee',
                                            linkHoverColor: '#0000ee',
                                            linkUnderline: true,
                                            linkHoverUnderline: true,
                                        },
                                        hideDesktop: false,
                                        displayCondition: null,
                                        _meta: {
                                            htmlID: 'u_content_text_6',
                                            htmlClassNames: 'u_content_text',
                                        },
                                        selectable: true,
                                        draggable: true,
                                        duplicatable: true,
                                        deletable: true,
                                        hideable: true,
                                        hideMobile: false,
                                        text: '<p style="font-size: 14px; line-height: 140%;"><span style="font-size: 16px; line-height: 22.4px;"><strong><span style="line-height: 22.4px; font-size: 16px;">$25</span></strong></span></p>',
                                    },
                                },
                                {
                                    id: 'Ko-67gyh8-',
                                    type: 'button',
                                    values: {
                                        containerPadding: '10px',
                                        anchor: '',
                                        href: {
                                            name: 'web',
                                            values: {
                                                href: '',
                                                target: '_blank',
                                            },
                                        },
                                        buttonColors: {
                                            color: '#FFFFFF',
                                            backgroundColor: '#262425',
                                            hoverColor: '#FFFFFF',
                                            hoverBackgroundColor: '#3AAEE0',
                                        },
                                        size: {
                                            autoWidth: true,
                                            width: '100%',
                                        },
                                        textAlign: 'center',
                                        lineHeight: '120%',
                                        padding: '10px 20px',
                                        border: {},
                                        borderRadius: '0px',
                                        hideDesktop: false,
                                        displayCondition: null,
                                        _meta: {
                                            htmlID: 'u_content_button_3',
                                            htmlClassNames: 'u_content_button',
                                        },
                                        selectable: true,
                                        draggable: true,
                                        duplicatable: true,
                                        deletable: true,
                                        hideable: true,
                                        hideMobile: false,
                                        text: '<span style="font-size: 14px; line-height: 16.8px;">Buy Now</span>',
                                        calculatedWidth: 104,
                                        calculatedHeight: 36,
                                    },
                                },
                            ],
                            values: {
                                _meta: {
                                    htmlID: 'u_column_10',
                                    htmlClassNames: 'u_column',
                                },
                                border: {},
                                padding: '0px',
                                backgroundColor: '',
                            },
                        },
                    ],
                    values: {
                        displayCondition: null,
                        columns: false,
                        backgroundColor: '',
                        columnsBackgroundColor: '#ffffff',
                        backgroundImage: {
                            url: '',
                            fullWidth: true,
                            repeat: false,
                            center: true,
                            cover: false,
                        },
                        padding: '0px',
                        anchor: '',
                        hideDesktop: false,
                        _meta: {
                            htmlID: 'u_row_4',
                            htmlClassNames: 'u_row',
                        },
                        selectable: true,
                        draggable: true,
                        duplicatable: true,
                        deletable: true,
                        hideable: true,
                        hideMobile: false,
                        noStackMobile: false,
                    },
                },
                {
                    id: 'Bukp-wL9Tq',
                    cells: [1],
                    columns: [
                        {
                            id: 'DIZm4Mag5G',
                            contents: [
                                {
                                    id: 'tTvJ8mRS5J',
                                    type: 'text',
                                    values: {
                                        containerPadding: '30px 30px 40px',
                                        anchor: '',
                                        textAlign: 'center',
                                        lineHeight: '160%',
                                        linkStyle: {
                                            inherit: true,
                                            linkColor: '#0000ee',
                                            linkHoverColor: '#0000ee',
                                            linkUnderline: true,
                                            linkHoverUnderline: true,
                                        },
                                        hideDesktop: false,
                                        displayCondition: null,
                                        _meta: {
                                            htmlID: 'u_content_text_7',
                                            htmlClassNames: 'u_content_text',
                                        },
                                        selectable: true,
                                        draggable: true,
                                        duplicatable: true,
                                        deletable: true,
                                        hideable: true,
                                        hideMobile: false,
                                        text: '<p style="font-size: 14px; line-height: 160%;"><span style="font-size: 14px; line-height: 22.4px;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.&nbsp;</span></p>',
                                    },
                                },
                            ],
                            values: {
                                _meta: {
                                    htmlID: 'u_column_11',
                                    htmlClassNames: 'u_column',
                                },
                                border: {},
                                padding: '0px',
                                backgroundColor: '',
                            },
                        },
                    ],
                    values: {
                        displayCondition: null,
                        columns: false,
                        backgroundColor: '',
                        columnsBackgroundColor: '#ffffff',
                        backgroundImage: {
                            url: '',
                            fullWidth: true,
                            repeat: false,
                            center: true,
                            cover: false,
                        },
                        padding: '0px',
                        anchor: '',
                        hideDesktop: false,
                        _meta: {
                            htmlID: 'u_row_8',
                            htmlClassNames: 'u_row',
                        },
                        selectable: true,
                        draggable: true,
                        duplicatable: true,
                        deletable: true,
                        hideable: true,
                        hideMobile: false,
                        noStackMobile: false,
                    },
                },
                {
                    id: 'jQK99awn7R',
                    cells: [1],
                    columns: [
                        {
                            id: '3oqMnDwcvB',
                            contents: [
                                {
                                    id: 'caNnD-E-CP',
                                    type: 'text',
                                    values: {
                                        containerPadding: '60px 30px 0px',
                                        anchor: '',
                                        color: '#ffffff',
                                        textAlign: 'left',
                                        lineHeight: '120%',
                                        linkStyle: {
                                            inherit: true,
                                            linkColor: '#0000ee',
                                            linkHoverColor: '#0000ee',
                                            linkUnderline: true,
                                            linkHoverUnderline: true,
                                        },
                                        hideDesktop: false,
                                        displayCondition: null,
                                        _meta: {
                                            htmlID: 'u_content_text_8',
                                            htmlClassNames: 'u_content_text',
                                        },
                                        selectable: true,
                                        draggable: true,
                                        duplicatable: true,
                                        deletable: true,
                                        hideable: true,
                                        hideMobile: false,
                                        text: '<p style="font-size: 14px; line-height: 120%;"><span style="font-size: 32px; line-height: 38.4px;"><strong><span style="line-height: 38.4px; font-size: 32px;">ABOUT OUR</span></strong></span></p>\n<p style="font-size: 14px; line-height: 120%;"><span style="font-size: 32px; line-height: 38.4px;"><strong><span style="line-height: 38.4px; font-size: 32px;"> PRODUCT</span></strong></span></p>',
                                        _override: {
                                            mobile: {
                                                textAlign: 'center',
                                            },
                                        },
                                    },
                                },
                                {
                                    id: 'cKumwemqHf',
                                    type: 'text',
                                    values: {
                                        containerPadding: '22px 30px 10px',
                                        anchor: '',
                                        color: '#ffffff',
                                        textAlign: 'left',
                                        lineHeight: '140%',
                                        linkStyle: {
                                            inherit: true,
                                            linkColor: '#0000ee',
                                            linkHoverColor: '#0000ee',
                                            linkUnderline: true,
                                            linkHoverUnderline: true,
                                        },
                                        hideDesktop: false,
                                        displayCondition: null,
                                        _meta: {
                                            htmlID: 'u_content_text_9',
                                            htmlClassNames: 'u_content_text',
                                        },
                                        selectable: true,
                                        draggable: true,
                                        duplicatable: true,
                                        deletable: true,
                                        hideable: true,
                                        hideMobile: false,
                                        text: '<p style="font-size: 14px; line-height: 140%;"><span style="font-size: 14px; line-height: 19.6px;">Lorem ipsum dolor sit amet, consectetur </span></p>\n<p style="font-size: 14px; line-height: 140%;"><span style="font-size: 14px; line-height: 19.6px;">adipiscing elit, sed do eiusmod tempor </span></p>\n<p style="font-size: 14px; line-height: 140%;"><span style="font-size: 14px; line-height: 19.6px;">incididunt ut labore et dolore magna </span></p>\n<p style="font-size: 14px; line-height: 140%;"><span style="font-size: 14px; line-height: 19.6px;"><span style="line-height: 19.6px; font-size: 14px;">aliqua.</span><span style="line-height: 19.6px; font-size: 14px;">enim ad minim veniam, quis nostrud </span></span></p>\n<p style="font-size: 14px; line-height: 140%;"><span style="font-size: 14px; line-height: 19.6px;"><span style="line-height: 19.6px; font-size: 14px;">exercitation ullamco</span><span style="line-height: 19.6px; font-size: 14px;">&nbsp;</span></span></p>',
                                        _override: {
                                            mobile: {
                                                textAlign: 'center',
                                            },
                                        },
                                    },
                                },
                                {
                                    id: 'FG1hKimyyp',
                                    type: 'button',
                                    values: {
                                        containerPadding: '10px 30px 40px',
                                        anchor: '',
                                        href: {
                                            name: 'web',
                                            values: {
                                                href: '',
                                                target: '_blank',
                                            },
                                        },
                                        buttonColors: {
                                            color: '#252324',
                                            backgroundColor: '#ffffff',
                                            hoverColor: '#FFFFFF',
                                            hoverBackgroundColor: '#3AAEE0',
                                        },
                                        size: {
                                            autoWidth: true,
                                            width: '100%',
                                        },
                                        textAlign: 'left',
                                        lineHeight: '120%',
                                        padding: '12px 25px',
                                        border: {},
                                        borderRadius: '0px',
                                        hideDesktop: false,
                                        displayCondition: null,
                                        _meta: {
                                            htmlID: 'u_content_button_4',
                                            htmlClassNames: 'u_content_button',
                                        },
                                        selectable: true,
                                        draggable: true,
                                        duplicatable: true,
                                        deletable: true,
                                        hideable: true,
                                        hideMobile: false,
                                        text: '<strong><span style="font-size: 14px; line-height: 16.8px;">VIEW MORE</span></strong>',
                                        _override: {
                                            mobile: {
                                                textAlign: 'center',
                                            },
                                        },
                                        calculatedWidth: 139,
                                        calculatedHeight: 40,
                                    },
                                },
                            ],
                            values: {
                                _meta: {
                                    htmlID: 'u_column_9',
                                    htmlClassNames: 'u_column',
                                },
                                border: {},
                                padding: '0px',
                                backgroundColor: '',
                            },
                        },
                    ],
                    values: {
                        displayCondition: null,
                        columns: false,
                        backgroundColor: '',
                        columnsBackgroundColor: '',
                        backgroundImage: {
                            url: 'https://cdn.templates.unlayer.com/assets/1606937518713-ASASS.png',
                            fullWidth: false,
                            repeat: false,
                            center: true,
                            cover: false,
                            width: 600,
                            height: 500,
                        },
                        padding: '0px',
                        anchor: '',
                        hideDesktop: false,
                        _meta: {
                            htmlID: 'u_row_7',
                            htmlClassNames: 'u_row',
                        },
                        selectable: true,
                        draggable: true,
                        duplicatable: true,
                        deletable: true,
                        hideable: true,
                        hideMobile: false,
                        noStackMobile: false,
                    },
                },
                {
                    id: 'qeKgkENjiw',
                    cells: [1],
                    columns: [
                        {
                            id: '_O186QKYzg',
                            contents: [
                                {
                                    id: '5XlEPqCM--',
                                    type: 'divider',
                                    values: {
                                        width: '100%',
                                        border: {
                                            borderTopWidth: '0px',
                                            borderTopStyle: 'solid',
                                            borderTopColor: '#BBBBBB',
                                        },
                                        textAlign: 'center',
                                        containerPadding: '15px',
                                        anchor: '',
                                        hideDesktop: false,
                                        displayCondition: null,
                                        _meta: {
                                            htmlID: 'u_content_divider_4',
                                            htmlClassNames: 'u_content_divider',
                                        },
                                        selectable: true,
                                        draggable: true,
                                        duplicatable: true,
                                        deletable: true,
                                        hideable: true,
                                        hideMobile: false,
                                    },
                                },
                            ],
                            values: {
                                _meta: {
                                    htmlID: 'u_column_12',
                                    htmlClassNames: 'u_column',
                                },
                                border: {},
                                padding: '0px',
                                backgroundColor: '',
                            },
                        },
                    ],
                    values: {
                        displayCondition: null,
                        columns: false,
                        backgroundColor: '',
                        columnsBackgroundColor: '#ffffff',
                        backgroundImage: {
                            url: '',
                            fullWidth: true,
                            repeat: false,
                            center: true,
                            cover: false,
                        },
                        padding: '0px',
                        anchor: '',
                        hideDesktop: false,
                        _meta: {
                            htmlID: 'u_row_9',
                            htmlClassNames: 'u_row',
                        },
                        selectable: true,
                        draggable: true,
                        duplicatable: true,
                        deletable: true,
                        hideable: true,
                        hideMobile: false,
                        noStackMobile: false,
                    },
                },
                {
                    id: 'fbHcf_ZXyK',
                    cells: [1],
                    columns: [
                        {
                            id: 'sR6ZsnZdEN',
                            contents: [
                                {
                                    id: 'QXsZos0gWB',
                                    type: 'text',
                                    values: {
                                        containerPadding: '20px 10px 10px',
                                        anchor: '',
                                        color: '#ffffff',
                                        textAlign: 'center',
                                        lineHeight: '140%',
                                        linkStyle: {
                                            inherit: true,
                                            linkColor: '#0000ee',
                                            linkHoverColor: '#0000ee',
                                            linkUnderline: true,
                                            linkHoverUnderline: true,
                                        },
                                        hideDesktop: false,
                                        displayCondition: null,
                                        _meta: {
                                            htmlID: 'u_content_text_10',
                                            htmlClassNames: 'u_content_text',
                                        },
                                        selectable: true,
                                        draggable: true,
                                        duplicatable: true,
                                        deletable: true,
                                        hideable: true,
                                        hideMobile: false,
                                        text: '<p style="font-size: 14px; line-height: 140%;"><span style="font-size: 14px; line-height: 19.6px; font-family: Montserrat, sans-serif;"><strong><span style="line-height: 19.6px; font-size: 14px;">FOLLOW&nbsp; US&nbsp; ON</span></strong></span></p>',
                                    },
                                },
                                {
                                    id: 'alKQu_pZ_Q',
                                    type: 'social',
                                    values: {
                                        containerPadding: '0px 10px 20px',
                                        anchor: '',
                                        icons: {
                                            iconType: 'circle-white',
                                            icons: [
                                                {
                                                    url: 'https://facebook.com/',
                                                    name: 'Facebook',
                                                },
                                                {
                                                    url: 'https://instagram.com/',
                                                    name: 'Instagram',
                                                },
                                                {
                                                    url: 'https://twitter.com/',
                                                    name: 'Twitter',
                                                },
                                            ],
                                            editor: {
                                                data: {
                                                    showDefaultIcons: true,
                                                    showDefaultOptions: true,
                                                    customIcons: [],
                                                    customOptions: [],
                                                },
                                            },
                                        },
                                        align: 'center',
                                        spacing: 10,
                                        hideDesktop: false,
                                        displayCondition: null,
                                        _meta: {
                                            htmlID: 'u_content_social_1',
                                            htmlClassNames: 'u_content_social',
                                        },
                                        selectable: true,
                                        draggable: true,
                                        duplicatable: true,
                                        deletable: true,
                                        hideable: true,
                                        hideMobile: false,
                                    },
                                },
                            ],
                            values: {
                                _meta: {
                                    htmlID: 'u_column_14',
                                    htmlClassNames: 'u_column',
                                },
                                border: {},
                                padding: '0px',
                                backgroundColor: '',
                            },
                        },
                    ],
                    values: {
                        displayCondition: null,
                        columns: false,
                        backgroundColor: '',
                        columnsBackgroundColor: '#d4ae7f',
                        backgroundImage: {
                            url: '',
                            fullWidth: true,
                            repeat: false,
                            center: true,
                            cover: false,
                        },
                        padding: '0px',
                        anchor: '',
                        hideDesktop: false,
                        _meta: {
                            htmlID: 'u_row_11',
                            htmlClassNames: 'u_row',
                        },
                        selectable: true,
                        draggable: true,
                        duplicatable: true,
                        deletable: true,
                        hideable: true,
                        hideMobile: false,
                        noStackMobile: false,
                    },
                },
                {
                    id: 'mM5leqDP32',
                    cells: [1],
                    columns: [
                        {
                            id: 'oNKQg3v_m_',
                            contents: [
                                {
                                    id: 'gQtrzSD2QW',
                                    type: 'divider',
                                    values: {
                                        width: '100%',
                                        border: {
                                            borderTopWidth: '0px',
                                            borderTopStyle: 'solid',
                                            borderTopColor: '#BBBBBB',
                                        },
                                        textAlign: 'center',
                                        containerPadding: '10px',
                                        anchor: '',
                                        hideDesktop: false,
                                        displayCondition: null,
                                        _meta: {
                                            htmlID: 'u_content_divider_5',
                                            htmlClassNames: 'u_content_divider',
                                        },
                                        selectable: true,
                                        draggable: true,
                                        duplicatable: true,
                                        deletable: true,
                                        hideable: true,
                                        hideMobile: false,
                                    },
                                },
                            ],
                            values: {
                                _meta: {
                                    htmlID: 'u_column_15',
                                    htmlClassNames: 'u_column',
                                },
                                border: {},
                                padding: '0px',
                                backgroundColor: '',
                            },
                        },
                    ],
                    values: {
                        displayCondition: null,
                        columns: false,
                        backgroundColor: '',
                        columnsBackgroundColor: '',
                        backgroundImage: {
                            url: '',
                            fullWidth: true,
                            repeat: false,
                            center: true,
                            cover: false,
                        },
                        padding: '0px',
                        anchor: '',
                        hideDesktop: false,
                        _meta: {
                            htmlID: 'u_row_12',
                            htmlClassNames: 'u_row',
                        },
                        selectable: true,
                        draggable: true,
                        duplicatable: true,
                        deletable: true,
                        hideable: true,
                        hideMobile: false,
                        noStackMobile: false,
                    },
                },
            ],
            values: {
                popupPosition: 'center',
                popupWidth: '600px',
                popupHeight: 'auto',
                borderRadius: '10px',
                contentAlign: 'center',
                contentVerticalAlign: 'center',
                contentWidth: '600px',
                fontFamily: {
                    label: 'Montserrat',
                    value: "'Montserrat',sans-serif",
                    url: 'https://fonts.googleapis.com/css?family=Montserrat:400,700',
                    defaultFont: true,
                },
                textColor: '#000000',
                popupBackgroundColor: '#FFFFFF',
                popupBackgroundImage: {
                    url: '',
                    fullWidth: true,
                    repeat: false,
                    center: true,
                    cover: true,
                },
                popupOverlay_backgroundColor: 'rgba(0, 0, 0, 0.1)',
                popupCloseButton_position: 'top-right',
                popupCloseButton_backgroundColor: '#DDDDDD',
                popupCloseButton_iconColor: '#000000',
                popupCloseButton_borderRadius: '0px',
                popupCloseButton_margin: '0px',
                popupCloseButton_action: {
                    name: 'close_popup',
                    attrs: {
                        onClick: "document.querySelector('.u-popup-container').style.display = 'none';",
                    },
                },
                backgroundColor: '#e8d4bb',
                backgroundImage: {
                    url: '',
                    fullWidth: true,
                    repeat: false,
                    center: true,
                    cover: false,
                },
                preheaderText: '',
                linkStyle: {
                    body: true,
                    linkColor: '#0000ee',
                    linkHoverColor: '#0000ee',
                    linkUnderline: true,
                    linkHoverUnderline: true,
                },
                _meta: {
                    htmlID: 'u_body',
                    htmlClassNames: 'u_body',
                },
            },
        },
        schemaVersion: 9,
    };

    const exportHtml = () => {
        // emailEditorRef.current.editor.exportHtml((data) => {
        //     const { design, html } = data;
        //     console.log('design: ', design);
        //     localStorage.setItem('designnnnnn', JSON.stringify(design));
        //     localStorage.setItem('designnnnnnHTMLL', JSON.stringify(html));
        //     console.log(html);
        // });

        setModal(true);
    };

    const onLoad = () => {
        // editor instance is created
        // you can load your template here;
        // const templateJson = {...JSON.parse(localStorage.getItem('designnnnnn'))};
        // emailEditorRef.current.editor.loadDesign(templateJson);
        // if(localStorage.getItem('designnnnnn') !== null && emailEditorRef.current.editor !== null) {
        //   const templateJson  = {...JSON.parse(localStorage.getItem('designnnnnn'))}
        //   emailEditorRef.current.editor.loadDesign(templateJson);
        // }
    };

    const onReady = () => {
        // editor is ready
        // console.log('onReady');
        if (localStorage.getItem('designnnnnn') !== null) {
            const templateJson = { ...JSON.parse(localStorage.getItem('designnnnnn')) };
            emailEditorRef.current.editor.loadDesign(templateJson);
        }
    };

    const importPdf = () => {
        emailEditorRef.current.editor.loadDesign(pdfObject);
    };

    const deleteDraft = () => {
        emailEditorRef.current.editor.loadDesign({
            counters: {
                u_column: 2,
                u_row: 2,
            },
            body: {
                id: 'RzeLrb2zXc',
                rows: [],
                values: {
                    popupPosition: 'center',
                    popupWidth: '600px',
                    popupHeight: 'auto',
                    borderRadius: '10px',
                    contentAlign: 'center',
                    contentVerticalAlign: 'center',
                    contentWidth: '500px',
                    fontFamily: {
                        label: 'Arial',
                        value: 'arial,helvetica,sans-serif',
                    },
                    textColor: '#000000',
                    popupBackgroundColor: '#FFFFFF',
                    popupBackgroundImage: {
                        url: '',
                        fullWidth: true,
                        repeat: false,
                        center: true,
                        cover: true,
                    },
                    popupOverlay_backgroundColor: 'rgba(0, 0, 0, 0.1)',
                    popupCloseButton_position: 'top-right',
                    popupCloseButton_backgroundColor: '#DDDDDD',
                    popupCloseButton_iconColor: '#000000',
                    popupCloseButton_borderRadius: '0px',
                    popupCloseButton_margin: '0px',
                    popupCloseButton_action: {
                        name: 'close_popup',
                        attrs: {
                            onClick: "document.querySelector('.u-popup-container').style.display = 'none';",
                        },
                    },
                    backgroundColor: '#e7e7e7',
                    backgroundImage: {
                        url: '',
                        fullWidth: true,
                        repeat: false,
                        center: true,
                        cover: false,
                    },
                    preheaderText: '',
                    linkStyle: {
                        body: true,
                        linkColor: '#0000ee',
                        linkHoverColor: '#0000ee',
                        linkUnderline: true,
                        linkHoverUnderline: true,
                    },
                    _meta: {
                        htmlID: 'u_body',
                        htmlClassNames: 'u_body',
                    },
                },
            },
            schemaVersion: 9,
        });
    };

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(false);
    const noButton = () => setModal(false);

    const yesButton = async () => {
        await emailEditorRef.current.editor.exportHtml((data) => {
            const { design, html } = data;
            localStorage.setItem('designnnnnn', JSON.stringify(design));
            localStorage.setItem('designnnnnnHTMLL', JSON.stringify(html));

            FetchApiPost('services/Pages/Page/SaveBrochureHtmlFile', 'POST', {
                HtmlFile: JSON.stringify(html),
            }).then((res) => setModal(false));
        });
    };
    return (
        <div>
            {/* <TemplateDetails template={brochureHtml} /> */}
            {/* {/* <h3>Brochure</h3>
            <div className="d-flex my-2">
                <button className="btn btn-primary" onClick={exportHtml}>
                    PDF'i Kaydet
                </button>
                <button className="btn btn-primary ms-4" onClick={importPdf}>
                    Örnek PDF Göster
                </button>
                <button className="btn btn-primary ms-4" onClick={deleteDraft}>
                    Taslağı Sil
                </button>
            </div> */}
            {/* <EmailEditor ref={emailEditorRef} onLoad={onLoad} onReady={onReady} /> */}
            {/* <button class="btn btn-primary" onClick={() => printDocument()}>Export To PDF</button> */}

      {/* <SaveQuestion modal={modal} toggle={false} noButton={noButton} yesButton={yesButton} message={'Are you sure you want to save?'}/> */}
        <h3>Templates</h3>
        <Templates />
    </div>
  )
}

export default Brochure;