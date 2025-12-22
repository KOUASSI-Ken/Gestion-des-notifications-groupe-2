<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Notification_Payment;

class NotificationPaymentController extends Controller
{
    // Récupérer toutes les notifications d'un user
    public function index(Request $request)
    {
        $user = $request->user();

        return Notification_Payment::where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->get();
    }

     // Marquer une notification comme lue
    public function markAsRead($id, Request $request)
    {
        $user = $request->user();

        $notif = Notification_Payment::where('id', $id)
            ->where('user_id', $user->id)
            ->firstOrFail();

        $notif->update(['is_read' => true]);

        return response()->json(['success' => true]);
    }



}
