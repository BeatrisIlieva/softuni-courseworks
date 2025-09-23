from enum import Enum

from pydantic import BaseModel, Field


class CustomerIntentEnum(str, Enum):
    SIZING_HELP = 'general_sizing_help_about_measurement_not_related_to_products_availability'
    PRICING = 'pricing'
    CARE_INSTRUCTIONS = 'care_instructions'
    RETURN_POLICY = 'return_policy'
    SHIPPING_INFORMATION = 'shipping_information'
    BRAND_INFORMATION = 'brand_information'
    CONCERN_OR_HESITATION = 'concern_or_hesitation'
    PROCESSING_TRANSACTION = 'processing_transaction_or_completing_an_order'
    PRODUCTS_INFO = 'wants_product_information_or_products_availability_information_or_shares_preferences'
    OFF_TOPIC = 'off_topic'


class CustomerIntent(BaseModel):
    primary_intent: CustomerIntentEnum = Field(
        default=CustomerIntentEnum.OFF_TOPIC,
        description='The primary intent the customer is expressing'
    )


class WearerGender(BaseModel):
    gender: str = Field(
        default='unknown',
        description='Gender of the intended wearer of the jewelry, not necessarily the purchaser. Determined from pronouns, relationships, names, or direct statements in the conversation.'
    )


class CategoryType(BaseModel):
    category: str = Field(
        default='unknown',
        description='The jewelry type (e.g., ring, necklace, bracelet, earrings, watch, pendant, brooch, anklet, etc.) the customer is currently focused on. If the customer shifts from one type to another, update to reflect their current interest. IMPORTANT: Reset to unknown if customer starts a new search for a different person or separate product request.'
    )


class MetalType(BaseModel):
    metal_type: str = Field(
        default='unknown',
        description='The metal type (e.g. silver, yellow gold, platinum, etc.) the customer is currently focused on. If the customer shifts from one type to another, update to reflect their current interest. IMPORTANT: Set to unknown if customer starts a new search for a different person or separate product request.'
    )


class StoneType(BaseModel):
    stone_type: str = Field(
        default='unknown',
        description='The stone type (e.g. diamond, ruby, emerald, etc.) the customer is currently focused on. If the customer shifts from one type to another, update to reflect their current interest. IMPORTANT: Set to unknown if customer starts a new search for a different person or separate product request.'
    )
