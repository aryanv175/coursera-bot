what do we need?
- a website:
    -simple/base version of the app: it does not need to have the gemini integration. just needs to have a inputbox on the website, the user enters the url of the coursera course. the website then scrapes the information about the course from the given url, so that it can later utilize it for RAG. it prints the scaped information in the console and prints 'printed in console' on the webpage. that is all. 
- sign in with google, only option. all we need.
- shows the coursera course on the left 
- chat bot on the right
- you ask questions and it answers, pretty basic
- using gemini cuz required by client
- need to use RAG so that gemini only answers based on the info provided by the course and does not go beyonf the scope of the materal
- backend needs to scrape what material is present on the course page
- add on
    - questionnaire or flashcard at the end
    - pay wall certain features


# remarks:
    - accessing or getting the coursera page on our website is simply not possible because of the SAME_ORIGIN_POLICY. 
    - we will just have to start over and make a chrome extension itself. the landing page can remain the same.