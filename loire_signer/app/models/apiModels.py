"""
MIT License

Copyright (c) 2024 Tecnalia, Basque Research & Technology Alliance (BRTA)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
"""

from __future__ import annotations

from typing import List

from pydantic import BaseModel, Field

class VerifiableCredential:
    def __init__(self, data: dict):
        self.data = data

class EnvelopedVerifiableCredential(BaseModel):
    #self.context = "https://www.w3.org/ns/credentials/v2"
    #self.id = f"data:application/vc+jwt,{vc_jwt}"
    #self.type = "EnvelopedVerifiableCredential"
    context: str
    id: str
    type:str
class VerifiablePresentation(BaseModel):

    #self.context = ["https://www.w3.org/ns/credentials/v2", "https://www.w3.org/ns/credentials/examples/v2"]
    #self.type = "VerifiablePresentation"
    #self.verifiableCredential = credentials
    context: List[str] = Field(..., serialization_alias='@context')
    type:str
    verifiableCredential: List[EnvelopedVerifiableCredential]
