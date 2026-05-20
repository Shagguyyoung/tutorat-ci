<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Message extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'from_id', 'to_id', 'session_id', 'contenu', 'lu', 'lu_at',
    ];

    protected $casts = [
        'lu'    => 'boolean',
        'lu_at' => 'datetime',
    ];

    public function expediteur(): BelongsTo
    {
        return $this->belongsTo(User::class, 'from_id');
    }

    public function destinataire(): BelongsTo
    {
        return $this->belongsTo(User::class, 'to_id');
    }

    public function session(): BelongsTo
    {
        return $this->belongsTo(SessionTutorat::class, 'session_id');
    }

    public function marquerLu(): void
    {
        $this->update(['lu' => true, 'lu_at' => now()]);
    }
}