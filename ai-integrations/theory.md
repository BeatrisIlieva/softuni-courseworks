## OpenAI and Anthropic API Integration

### Parameters

1. `model` ('gpt-4o-mini')
2. `input`
3. `max_output_tokens` -> determines how the long the response of the model to be
4. `temperature` -> it varies 0-2; the higher it is the more. creative the model is; it increases the chance the model to use other words not only the one with the highest percentage
5. `Top-p` -> gets the possible words based on the highest percentage they have; if we set it to 0.5 it will take the words which percentage sum is closest to 0.5 but below it; then i chooses only between those words; it takes the one with highest percentage; however here the temperature can change the percentages of the word and thus influences the model choice; this is how we regulate the model creativity
6. `frequency_penalty` -> we punish the AI if they use one and the same words; the highest the penalty the less the words will repeat;
reduces repetition based ot frequency
7. `presence_penalty` -> reduces repetitions based on presence
8. `stream` -> when set to `True` it reduces the time for waiting. The AI writes letter by letter. It does not wait for the entire response to arrive but write it letter by letter

Both frequency and presence penalty make the AI more creative.


> Top-p and temperature determine how creative the model will be. the highest they are the more creative the model is


> difference between system instructions and prompt:

-   System instructions are with highest priority - in them we describe the behaviour rules, restrictions and context; system instructions help us to prevent someone messing up with out prompt

### Context windows

Includes:

-   System instructions -> highest priority 
-   Conversation history
-   Current prompt -> this is every next message

### Prompt Caching

In order something to be cached it has not to be changed. The system instructions are not being changed so they get cached.
The first time we send a request we get charged for the system instructions, bot not vor every next time. So static content gets cached. If we do not send requests for 5-10 minutes the cache gets cleared. If we use it by default it expires after one hour. On the second request we pay not for the input tokens but for the cache which is much cheaper. Thus until we change the static content. 


### Batch Processing

In a JSON file we summarize details. The AI will use them whenever it decides within the next 24 hours. We use for example a while loop to ask withing some range of time if the result is ready. Is is cost effective when we need to process large dataset. The separate records in the JSON file does know not about each other. 

### Tool using

The AI agent decides what function to use depending on the request

### Streaming

Reduces the time for waiting. The AI writes letter by letter. It does not wait for the entire response to arrive but write it letter by letter. 
