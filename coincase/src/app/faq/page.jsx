"use client"
import React from 'react'
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box } from "@chakra-ui/react"
import styled from 'styled-components'

const FaqContainer = styled.div`

  align-items: center;
  justify-content: center;
  height: 100vh; 
  margin: 80px; 
  margin-top: 100px;
`;

const FaqTitle = styled.h1`
  text-align: center;
  color: #333; /* Adjust the color as needed */
  font-size: 3em; /* Adjust the font size as needed */
  font-weight: bold;
`;

const faq = () => {
  return (
    <>
     <FaqTitle>FAQs</FaqTitle>
    <FaqContainer>
      <Accordion defaultIndex={[0]} allowMultiple>
  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box as="span" flex='1' textAlign='center'>
        What is Coincase?
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4} textAlign='center'>
    Coincase is a cryptocurrency exchange platform that facilitates the buying, selling, and trading of various digital assets.
    </AccordionPanel>
  </AccordionItem>

  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box as="span" flex='1' textAlign='center'>
        Is Coincase a secure platform?
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4} textAlign='center'>
    Yes, security is a top priority at Coincase. We employ advanced encryption and two-factor authentication to ensure the safety of user funds and personal information.
    </AccordionPanel>
  </AccordionItem>

  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box as="span" flex='1' textAlign='center'>
        How do I get started on Coincase?
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4} textAlign='center'>
    To begin using Coincase, simply sign up for an account on our website. Once registered, you can deposit funds and start trading cryptocurrencies.
    </AccordionPanel>
  </AccordionItem>

  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box as="span" flex='1' textAlign='center'>
        How do I create an account on Coincase?
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4} textAlign='center'>
    Visit our website and click on the &quot;Sign Up&quot; button. Follow the on-screen instructions to complete the registration process.
    </AccordionPanel>
  </AccordionItem>

  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box as="span" flex='1' textAlign='center'>
        How do I buy cryptocurrencies on Coincase?
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4} textAlign='center'>
    After depositing funds into your account, navigate to the trading section, select the cryptocurrency you want to buy, and follow the on-screen instructions to place your order.
    </AccordionPanel>
  </AccordionItem>

  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box as="span" flex='1' textAlign='center'>
        Can I sell my cryptocurrencies on Coincase?
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4} textAlign='center'> 
    Yes, you can sell cryptocurrencies on Coincase. Go to the trading section, select the cryptocurrency you want to sell, and follow the instructions to place a sell order.
    </AccordionPanel>
  </AccordionItem>
</Accordion>
</FaqContainer>
</>
  )
}

export default faq

