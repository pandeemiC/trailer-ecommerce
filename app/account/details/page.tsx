'use client'

import {useState, useEffect} from 'react'
import {createClient} from "@/lib/supabase/client";

export default function AccountDetails() {
  const supabase = await createClient();

// 1ST BATCH
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")

// 2ND BATCh
  const [street, setStreet] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [zip, setZip] = useState("")
  const [country, setCountry] = useState("")

  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const {data: {user}} = await supabase.auth.getUser()
      if (user) {
        setEmail(user.email ?? "");
        
        const meta = user.user_metadata;
        // for oauth
        setFirstName(meta?.first_name ?? meta?.full_name?.split(" ")[0] ?? "");
        setLastName(meta?.last_name ?? meta?.full_name?.split(" ").slice(1).join(" ") ?? "");
        setPhone(meta?.phone ?? "");
        // 2nd batch (addy)
        const addy = meta?.address ?? "";
        setStreet(addy.street ?? "");
        setCity(addy.city ?? "");
        setState(addy.state ?? "");
        setZip(addy.zip ?? "");
        setCountry(addy.country ?? "");
      }
    };
    getUser()
  }, [supabase]);

  const handleSave = async(e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSaved(false)

    const {error} = await supabase.auth.updateUser({
      data: {
        first_name: firstName,
        last_name: lastName,
        phone,
        address : {street, city, state, zip, country}m
      }
    });

    setLoading(false);
    if(!error) setSaved(true)
  };


  return (
    <div>
      
    </div>
  )
