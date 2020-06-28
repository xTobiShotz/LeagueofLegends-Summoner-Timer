# League of Legends Summoner Timer
**A very basic website to time enemy Summoner spells. Test it here: [Click me](https://xtobishotz.github.io/LeagueofLegends-Summoner-Timer/)**

**This has been made without any interaction with the League API which means:**
  - Summoner spells have to be selected manually.
  - Champion levels aren't a variable which makes timing Teleport kinda useless since its cooldown scales down with level.
And I don't think it ever will because I'm not sure what Riots stance on timing Sums like this is.

## Missing Stuff
**Some things are missing such as:**
+ Timing Smite Correctly.
  - Currently, the timer for Smite is 90 seconds which is not how Smite works ingame. (1 Stack at 00:00 plus an additional stack every 90s and a maximum of 2 stack at a time. 15s between stack uses which is unaffected by CDR.)
+ Resetting a Summoner timer.
+ Resetting the Game time.
+ Reselecting a single Summoner without having to redo them all.
  - Support for Spellbook Rune. (Probably not gonna happen)
