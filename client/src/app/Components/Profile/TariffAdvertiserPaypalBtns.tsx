'use client'
import { useState, useEffect, useRef } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"
import { getTokenForApi } from "@/app/utils/getTokenForApi";
import { useToast } from "@/shadComponents/ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { Dispatch, SetStateAction } from 'react'
import { IUser } from "@/app/types/interfaces";


export default function AdvertiserPayPalBtns({variant, setIsOpen}: {variant: string, setIsOpen: Dispatch<SetStateAction<boolean>>}) {
  const [user, setUser] = useState<IUser>();
  const { toast } = useToast();
  const orderId = useRef<any>('');
  let planId: string
  if (variant === '3 month'){
    planId = "00000020-8000-11ee-8000-102030405060"
  } else if (variant === '6 months'){
    planId = "00000021-8000-11ee-8000-102030405060"
  } else if (variant === '9 months'){
    planId = "00000022-8000-11ee-8000-102030405060"
  }

  const setSubscription = async (plan: string) => {
    try{
        const res = await fetch(`${process.env.BACKEND_URL}/plan-subscriptions/`, {
          method: 'POST',
          headers: {
            'Authorization' : `Bearer ${await getTokenForApi()}`,
            'Content-type': 'application/json'
          },
          body: JSON.stringify({plan, date: new Date().toISOString().split('T')[0]})
        })
        const data: any = await res.json();
        return data;
      } catch(e){
        toast({
          title: "You already have a subscription",
          variant: "destructive",
          action: (
            <ToastAction altText="Hide">Hide</ToastAction>
          ),
        })
      }
    }

  const createOrder = async () => {
    const data:any = await setSubscription(planId);
      if(data.status === 'activated'){
        toast({
          title: "You already bought this plan",
          variant: "destructive",
          action: (
            <ToastAction altText="Hide">Hide</ToastAction>
          ),
        })
        location.reload();
        return;
      }
      else{ return fetch(`${process.env.BACKEND_URL}/orders/plan/`, {
          method: "POST", 
          headers: {
              "Content-Type": "application/json",
              'Authorization': `Bearer ${await getTokenForApi()}`
          },
          body: JSON.stringify({subscription_id:  data.id}),
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
    return fetch(`${process.env.BACKEND_URL}/orders/plan/capture/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${await getTokenForApi()}`
      },
      body: JSON.stringify({order_id:  orderId.current})
  })
    .then(res => {
      toast({
        title: "You`re successfully buy a plan!",
        action: (
          <ToastAction altText="Hide">Hide</ToastAction>
        ),
      })
      location.reload();
    })
    .catch(e => {
      toast({
        title: "You already bought a plan",
        variant: "destructive",
        action: (
          <ToastAction altText="Hide">Hide</ToastAction>
        ),
      })
    })
    .finally(() => setIsOpen(false))
    ;
  }
  // const buyTicket = async (concert: string, user: Number) => {
  //   try{
  //       const res = await fetch(`${process.env.BACKEND_URL}/tickets/`, {
  //         method: 'POST',
  //         headers: {
  //           'Authorization' : `Bearer ${await getTokenForApi()}`,
  //           'Content-type': 'application/json'
  //         },
  //         body: JSON.stringify({concert, user})
  //       })
  //       const data: any = await res.json();
  //       return data;
  //     } catch(e){
  //       toast({
  //         title: "You already bought a plan",
  //         variant: "destructive",
  //         action: (
  //           <ToastAction altText="Hide">Hide</ToastAction>
  //         ),
  //       })
  //     }
  //   }

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