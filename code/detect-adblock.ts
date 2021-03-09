/**
 * simple script to detect adblock
 * From: https://davidwalsh.name/detect-ad-blocker
 */
async function detectAdblock() {

   let isBlocked: boolean;

   async function tryRequest(): Promise<boolean> {
      try {

         return fetch (
            // test if google ads are accessible...
            new Request("https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js", {
               method: 'HEAD', 
               mode: 'no-cors'
            })
         )
         .then((response: Response) => {
            // the request was successful, likely to ad blocked
            // response never used but left in in case this can be more specific later
            isBlocked = false;
            return isBlocked;
         }).catch((error: Response) => {
            // the request failed, perhaps an adblocker!
            // error never used but left in in case this can be more specific later
            isBlocked = true;
            return isBlocked;
         })
   
      } catch(error) {
         isBlocked = true;
         return isBlocked;
      }
   }

   return isBlocked !== undefined ? isBlocked : await tryRequest();
}

let usingBlocker: boolean = false;

async function adblockDetect() {
   usingBlocker = await detectAdblock();
   
   // use this to do something BELOW...
   // here! :D
   if(usingBlocker) {
      document.querySelector('.adblocker-notice').classList.add('adblocker-notice__display');
   }
}

adblockDetect();