# HPLT Analytics

This tool provide a full range of analytics automatically computed on either monolingual or bilingual data sets to help making informed decisions about them. 

It shows corpora details, volumes, language, length, noise and quality score distributions, common n-grams and others in the spirit of the work carried out by https://www.semanticscholar.org/paper/Documenting-the-English-Colossal-Clean-Crawled-Dodge-Sap/40c3327a6ddb0603b6892344509c7f428ab43d81. 

Support for language-dependent components has been added for dozens of languages. 

Automated reports generated out of the tool that is actioned from a web application to which a corpus can be uploaded. Once processed, the viewer will plot the analysis and automatically generate a PDF report containing the same information. 

<img alt="Data Analytics Viewer" src="https://github.com/hplt-project/data-analytics-tool/blob/main/img/data-viewer.png" width=600 />

Icon: https://thenounproject.com/icon/fingerprint-3530285/

Running the docker:

* sudo docker-compose build
* sudo docker-compose up

URLS to upload and view a dataset: 
* Uploader: localhost:8000/uploader.html
* Viewer: localhost:8000/viewer.html

If you need to access docker to run stuff inside:
* sudo docker exec -it dat-webapp /bin/bash

Code and data are located in `/work`

# Output examples: 

- [parallel English-Norwegian HPLT corpus from initial data release](https://github.com/hplt-project/data-analytics-tool/blob/main/img/en-nn.pdf): it shows that deduplication needs to be addressed as one of the most important issues.
- [monolingual Turkish corpus from Bianet](https://github.com/hplt-project/data-analytics-tool/blob/main/img/tr.bianet.tr.pdf): it shows that at least a 12% of the corpus is not in Turkish.  
