## OpenAI and Anthropic API Integration

### Parameters

1. `model` ('gpt-4o-mini')
2. `input` - `system` refers to the instructions, `user` to the prompt
3. `max_output_tokens` -> determines how the long the response of the model to be
4. `temperature` -> it varies 0-2; the higher it is the more creative the model is; it increases the chance the model to use other words not only the one with the highest percentage
5. `Top-p` -> gets the possible words based on the highest percentage they have; if we set it to 0.5 it will take the words which percentage sum is closest to 0.5 but below it; then i chooses only between those words; it takes the one with highest percentage; however here the temperature can change the percentages of the word and thus influences the model choice; this is how we regulate the model creativity
6. `frequency_penalty` -> we punish the AI if they use one and the same words; the highest the penalty the less the words will repeat;
reduces repetition based ot frequency
7. `presence_penalty` -> reduces repetitions based on presence
8. `stream` -> when set to `True` it reduces the time for waiting. The AI writes letter by letter. It does not wait for the entire response to arrive but write it letter by letter

Both frequency and presence penalty make the AI more creative.


> Top-p and temperature determine how creative the model will be. the highest they are the more creative the model is


> difference between system instructions and prompt:

-   System instructions are with highest priority - in them we describe the behaviour rules, restrictions, role and context; system instructions help us to prevent someone messing up with out prompt

### Context window

Includes:

-   System instructions -> highest priority 
-   Conversation history
-   Current prompt -> this is every next message

### Prompt Caching

In order something to be cached it has not to be changed. The system instructions are not being changed so they get cached.
The first time we send a request we get charged for the system instructions, but not for every next time. So static content gets cached. If we do not send requests for 5-10 minutes the cache gets cleared. If we use it by default it expires after one hour. On the second request we pay not for the input tokens but for the cache which is much cheaper. Thus until we change the static content. 


### Batch Processing

In a JSON file we summarize details. The AI will use them whenever it decides within the next 24 hours. We use for example a while loop to ask withing some range of time if the result is ready. Is is cost effective when we need to process large dataset. The separate records in the JSON file does know not about each other. Each rowe must have a unique id.

### Tool using

The AI agent decides what function to use depending on the request

### Streaming

Reduces the time for waiting. The AI writes letter by letter. It does not wait for the entire response to arrive but write it letter by letter. 


## Vector Databases and Embeddings

### Types of memory

1. Short Term Memory

Keeps knowledge about the current session (conversation). To maintain the short term memory we pass the question and the response with the `assistant` parameter in every next question.

2. Long Term memory

We need to functions -> one for saving the user info and one for reading it. 

3. Semantic Memory

The model's built in memory. This memory is built during training. 

4. Working memory

The bot splits the question into sub-problems (thinking). The it uses the solutions of the sub-problems to provide a solution.

5. RAG

Uses external databases to get information. It is a combination between a language model and vector search. 

- What is Embedding -> a way to represent words into list of numbers into a vector. Vector is a list with numbers. We give the AI a text. Then before the text enters into the AI neural network it is being converted into numbers. The AI does not understand words - it understands numbers. Embedding means to turn text into predefined exact count of numbers. The count of numbers depends on the model. Each num ber represents a coordinate in a single latent space. The more similar by meaning the words are the closer their coordinates.

- An AI trained to convert the words into numbers creates the embedding

- The search happens by the embedding (the coordinates). The returned result is the text on the row where similiarity by the vectors is found. 