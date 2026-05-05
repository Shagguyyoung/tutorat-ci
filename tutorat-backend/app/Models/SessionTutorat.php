<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class SessionTutorat extends Model
{
    use HasFactory, HasUuids;

    protected $table = 'sessions_tutorat';

    protected $fillable = [
        'tuteur_id', 'eleve_id', 'matiere',
        'date_heure', 'duree_minutes', 'montant',
        'statut', 'lieu', 'notes_eleve', 'notes_tuteur',
    ];

    protected $casts = [
        'date_heure'     => 'datetime',
        'montant'        => 'integer',
        'duree_minutes'  => 'integer',
    ];

    public function tuteur(): BelongsTo
    {
        return $this->belongsTo(Profile::class, 'tuteur_id');
    }

    public function eleve(): BelongsTo
    {
        return $this->belongsTo(User::class, 'eleve_id');
    }

    public function payment(): HasOne
    {
        return $this->hasOne(Payment::class, 'session_id');
    }

    public function review(): HasOne
    {
        return $this->hasOne(Review::class, 'session_id');
    }

    public function messages()
    {
        return $this->hasMany(Message::class, 'session_id');
    }

    public function estPayee(): bool
    {
        return $this->payment?->statut === 'reussi';
    }
}


class Payment extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'session_id', 'payer_id', 'montant', 'commission',
        'devise', 'provider', 'provider_transaction_id',
        'statut', 'provider_response', 'paid_at',
    ];

    protected $casts = [
        'montant'           => 'integer',
        'commission'        => 'integer',
        'provider_response' => 'array',
        'paid_at'           => 'datetime',
    ];

    public function session(): BelongsTo
    {
        return $this->belongsTo(SessionTutorat::class, 'session_id');
    }

    public function payer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'payer_id');
    }

    /** Montant reversé au tuteur après commission */
    public function getMontantTuteurAttribute(): int
    {
        return $this->montant - $this->commission;
    }
}


class Review extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'session_id', 'eleve_id', 'tuteur_id',
        'note', 'commentaire', 'visible',
    ];

    protected $casts = [
        'note'    => 'integer',
        'visible' => 'boolean',
    ];

    public function session(): BelongsTo
    {
        return $this->belongsTo(SessionTutorat::class, 'session_id');
    }

    public function eleve(): BelongsTo
    {
        return $this->belongsTo(User::class, 'eleve_id');
    }

    public function tuteur(): BelongsTo
    {
        return $this->belongsTo(Profile::class, 'tuteur_id');
    }

    /** Après sauvegarde, recalculer la note du tuteur */
    protected static function booted(): void
    {
        static::saved(function (Review $review) {
            $review->tuteur->recalculerNote();
        });
    }
}


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
