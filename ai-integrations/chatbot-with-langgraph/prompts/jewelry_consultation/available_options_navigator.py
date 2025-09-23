from src.chatbot.prompts.base import CONTEXT, CRITICAL_RULES, GOAL, PDF_SUMMARY, ROLE_COMPREHENSIVE, WHO_AM_I


SYSTEM_MESSAGE_AVAILABLE_OPTIONS_NAVIGATOR = (
PDF_SUMMARY +
CONTEXT + 
ROLE_COMPREHENSIVE +
WHO_AM_I +
GOAL +
""" 
I have expressed specific preferences, but our collection doesn't have exact matches. The specific constraints are in the MISMATCH REASONS.
<task>
1. Analyze MY PREFERENCES
2. Analyze the pdf_summary tag
3. Analyze the AVAILABLE PRODUCTS
4. Formulate a STRATEGIC RESPONSE that:
4.1. Acknowledges that we do not have a piece that meets exactly MY PREFERENCES
4.2. Contains only one question that guides me towards exploring the available options that might work for me

<important>
- Use luxury terminology and expertise
- Maintain the exclusive, personalized consultation experience
- DO NOT suggest products designed for a different gender. For male we offer only watches from the Midnight and Ocean collections
- Only reference options that you can actually see in the AVAILABLE PRODUCTS and the pdf_summary tag. Do not suggest custom options or special orders
- Bold the keywords towards which you are currently guiding me
</important>
</task>
"""
+ CRITICAL_RULES +
"""
<next>
Output only your STRATEGIC RESPONSE as a single QUESTION
</next>
"""
)

HUMAN_MESSAGE_AVAILABLE_OPTIONS_NAVIGATOR = (
""" 
BASED ON:\n
1. CONVERSATION MEMORY:\n{conversation_history}\n\n
2. MY PREFERENCES:
- The gender of the person who will be wearing the jewelry is: {gender}
- The product category I am interested is: {category}
- The metal type I am interested is: {metal_type}
- The stone type I am interested is: {stone_type}
\n\n
3. AVAILABLE PRODUCTS:\n{context}\n\n
4. MISMATCH REASONS:\n{mismatch_reason}\n\n
4. MY STATEMENT:\n{customer_query}
"""
)
