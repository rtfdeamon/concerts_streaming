'use client'
import { useState, useEffect, useRef } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"
import { getTokenForApi } from "@/app/utils/getTokenForApi";
import { useToast } from "@/shadComponents/ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { Dispatch, SetStateAction } from 'react'
import { IUser } from "@/app/types/interfaces";


export default function PayPalBtns({showId, setIsOpen}: {showId: string, setIsOpen: Dispatch<SetStateAction<boolean>>}) {
  const [user, setUser] = useState<IUser>();
  const { toast } = useToast();
  const orderId = useRef<any>('');

  const createOrder = async () => {
    const data:any = await buyTicket(showId, user?.id as number);
    console.log('FSDFS', data)
      if(data.status === 'activated'){
        toast({
          title: "You already bought this ticket",
          variant: "destructive",
          action: (
            <ToastAction altText="Hide">Hide</ToastAction>
          ),
        })
        return;
      }
      else{ return fetch(`${process.env.BACKEND_URL}/orders/`, {
          method: "POST", 
          headers: {
              "Content-Type": "application/json",
              'Authorization': `Bearer ${await getTokenForApi()}`
          },
          body: JSON.stringify({ticket_id:  data.id}),
        })
        .then((response) => response.json())
        .then((order) => {
          orderId.current = order.id;
          return order.id
        })
        .catch(e => {
          toast({
            title: "Something went wrong",
            variant: "destructive",
            action: (
              <ToastAction altText="Hide">Hide</ToastAction>
            ),
          })
        })
      }
  }

  const onApprove = async (data: any) => {
    return fetch(`${process.env.BACKEND_URL}/orders/capture/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${await getTokenForApi()}`
      },
      body: JSON.stringify({order_id:  orderId.current})
  })
    .then(res => {
      toast({
        title: "You`re successfully buy a ticket!",
        action: (
          <ToastAction altText="Hide">Hide</ToastAction>
        ),
      })
    })
    .catch(e => {
      toast({
        title: "You already bought a ticket",
        variant: "destructive",
        action: (
          <ToastAction altText="Hide">Hide</ToastAction>
        ),
      })
    })
    .finally(() => setIsOpen(false))
    ;
  }
  const buyTicket = async (concert: string, user: Number) => {
    try{
        const res = await fetch(`${process.env.BACKEND_URL}/tickets/`, {
          method: 'POST',
          headers: {
            'Authorization' : `Bearer ${await getTokenForApi()}`,
            'Content-type': 'application/json'
          },
          body: JSON.stringify({concert, user})
        })
        const data: any = await res.json();
        return data;
      } catch(e){
        toast({
          title: "You already bought a ticket",
          variant: "destructive",
          action: (
            <ToastAction altText="Hide">Hide</ToastAction>
          ),
        })
      }
    }

  useEffect(() => {
    const getUser = async () => {
      fetch(`${process.env.BACKEND_URL}/users/current/`, {
        method: 'GET',
        headers: {
          'Authorization' : `Bearer ${await getTokenForApi()}`
        }
      })
      .then(res => res.json())
      .then(res => setUser(res))
    }
    getUser()
  }, [])
  return (
    <PayPalScriptProvider
    options={{ clientId: "AfuXJhSUZp9UWT6r25qjWiQZGWRkFdhsTTn33s3AvZ71XMUCow329IFA-xea1iYFV_Gaxt-dnKQQhsCb" }}
    >
            <PayPalButtons
              style={{
                  color: 'gold',
                  shape: 'rect',
                  label: 'pay',
                  height: 54
              }}
              createOrder={createOrder}
              onApprove={onApprove}
            />
    </PayPalScriptProvider>
  )
}