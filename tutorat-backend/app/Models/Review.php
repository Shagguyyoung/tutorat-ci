<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

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

    protected static function booted(): void
    {
        static::saved(function (Review $review) {
            $review->tuteur->recalculerNote();
        });
    }
}