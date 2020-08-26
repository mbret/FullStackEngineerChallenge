
# Global 

All the code you can find here has been done in approximately 3 hours. Since it's the recommended time given in the mail I decided to drop
the missing feature. I could have add many more things to make the code better, faster, more reliable and fulfill all the given requirements
but this would take me much more than 3 hours and I am not sure it was the goal anyway.

### Technology and design choices

I will only talk about common technologies in this README. Both api & web have their own README to cover their
specific technologies and design choices

- I picked typescript for both api and web. This allowed me to develop and iterate over a working and 
reliable code faster. I spent most of my time developing new feature rather than debugging it.

### Missing features (that imo could have been done within the limitation given)

- ACL for user/admin
- Update employes for both web/api
- Support of feedback for both web/api
- No have cache for the web/api, every requests will re-run fully
- No proper concurrency / cancelation management for the web. (no saga / rxjs / etc)
- I haven't had time to write unit/e2e nor decided to do TDD since I knew it would take lot of time and was nearly impossible
to do withing 3 hours. At least to have meaningful tests.
- I haven't optimized the web, no memo, no cache, not much use of useCallback or useMemo. I have some of them to showcse that I know how
to use it but due to time limit decided to drop any proper optimization process
- lot of unfinished cleanup such as moving all the api call into `api.ts`, having proper hook name and externalized into own function / files, etc
- No validation of data for web/api