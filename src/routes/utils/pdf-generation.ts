import { RequestHandler } from 'express';
import * as ejs from 'ejs';
import * as pdf from 'html-pdf';
import * as path from 'path';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

import { CaseDetails } from '../../models/Case';
const shelfDataTemplate = path.join(
  __dirname,
  '../../utils/assets/shelf-data.ejs',
);
const docDataTemplate = path.join(
  __dirname,
  '../../utils/assets/document-data.ejs',
);

function getHtmlString(newEjsPath: string, dataObj: any) {
  return new Promise((resolve, reject) => {
    ejs.renderFile(newEjsPath, dataObj, (err, str) => {
      if (err) {
        return reject(err);
      }
      return resolve(str);
    });
  });
}

export const generatePdf: RequestHandler = async (req, res, next) => {
  try {
    let htmlString: any;

    if (req.body.type === 'shelf') {
      const pdfData = req.body.data.length ? req.body.data[0] : {};
      htmlString = await getHtmlString(shelfDataTemplate, { pdfData });
    } else if (req.body.type === 'documentList') {
      const pdfData = await CaseDetails.find(req.body.condition)
        .populate('caseStaffs.attorney typeOfCase caseStatus')
        .exec();
      htmlString = await getHtmlString(docDataTemplate, { pdfData });
    } else {
      return next(
        new RequestError(RequestErrorType.BAD_REQUEST, 'No such file present'),
      );
    }

    const options: any = {
      format: 'A4',
      width: '1100px',
      height: '1400px',
      orientation: 'portrait',
      margin: '5cm',
      border: {
        top: '1in', // default is 0, units: mm, cm, in, px
        right: '1in',
        bottom: '1in',
        left: '1in',
      },
    };

    pdf.create(htmlString, options).toStream((err: any, stream: any) => {
      if (err) {
        return next(
          new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err),
        );
      }
      res.setHeader('Content-Type', 'application/pdf');
      return stream.pipe(res);
    });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
