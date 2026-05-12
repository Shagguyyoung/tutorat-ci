<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use App\Models\SessionTutorat;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class PaymentController extends Controller
{
    public function initier(Request $request)
    {
        $request->validate([
            'session_id' => 'required|exists:sessions_tutorat,id',
        ]);

        $session = SessionTutorat::findOrFail($request->session_id);

        // Créer le paiement en base
        $payment = Payment::create([
            'session_id' => $session->id,
            'payer_id'   => $request->user()->id,
            'montant'    => $session->montant,
            'commission' => $session->montant * 0.10, // 10% de commission
            'devise'     => 'XOF',
            'provider'   => 'cinetpay',
            'statut'     => 'en_attente',
        ]);

        // Appel à l'API CinetPay
        $response = \Http::post('https://api-checkout.cinetpay.com/v2/payment', [
            'apikey'            => env('CINETPAY_API_KEY'),
            'site_id'           => env('CINETPAY_SITE_ID'),
            'transaction_id'    => $payment->id,
            'amount'            => $session->montant,
            'currency'          => 'XOF',
            'description'       => "Séance de {$session->matiere}",
            'return_url'        => env('CINETPAY_URL_RETURN'),
            'notify_url'        => env('CINETPAY_URL_NOTIFY'),
            'customer_name'     => $request->user()->profile?->nom ?? 'Client',
            'customer_surname'  => $request->user()->profile?->prenom ?? '',
            'customer_email'    => $request->user()->email,
            'customer_phone_number' => $request->user()->profile?->telephone ?? '',
            'customer_address'  => 'Abidjan',
            'customer_city'     => 'Abidjan',
            'customer_country'  => 'CI',
            'customer_state'    => 'CI',
            'customer_zip_code' => '00000',
            'channels'          => 'ALL',
        ]);

        $data = $response->json();

        if ($data['code'] === '201') {
            return response()->json([
                'payment_url' => $data['data']['payment_url'],
                'payment_id'  => $payment->id,
            ]);
        }

        return response()->json([
            'message' => 'Erreur lors de l\'initialisation du paiement.'
        ], 500);
    }

    public function notify(Request $request)
    {
        // CinetPay notifie ici quand le paiement est confirmé
        $transactionId = $request->cpm_trans_id;

        $response = \Http::post('https://api-checkout.cinetpay.com/v2/payment/check', [
            'apikey'         => env('CINETPAY_API_KEY'),
            'site_id'        => env('CINETPAY_SITE_ID'),
            'transaction_id' => $transactionId,
        ]);

        $data = $response->json();

        if ($data['data']['status'] === 'ACCEPTED') {
            $payment = Payment::find($transactionId);
            if ($payment) {
                $payment->update([
                    'statut'  => 'reussi',
                    'paid_at' => now(),
                    'provider_response' => $data,
                ]);
                // Mettre la séance en confirmé
                $payment->session->update(['statut' => 'confirme']);
            }
        }

        return response()->json(['message' => 'OK']);
    }
}