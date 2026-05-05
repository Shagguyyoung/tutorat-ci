<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, HasUuids, Notifiable;

    protected $fillable = [
        'email',
        'password',
        'role',
        'is_active',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'is_active'         => 'boolean',
    ];

    // ── Relations ────────────────────────────────────────────

    public function profile(): HasOne
    {
        return $this->hasOne(Profile::class);
    }

    public function sessionsEleve(): HasMany
    {
        return $this->hasMany(SessionTutorat::class, 'eleve_id');
    }

    public function messagesEnvoyes(): HasMany
    {
        return $this->hasMany(Message::class, 'from_id');
    }

    public function messagesRecus(): HasMany
    {
        return $this->hasMany(Message::class, 'to_id');
    }

    public function payments(): HasMany
    {
        return $this->hasMany(Payment::class, 'payer_id');
    }

    // ── Helpers ───────────────────────────────────────────────

    public function isTuteur(): bool
    {
        return $this->role === 'tuteur';
    }

    public function isEleve(): bool
    {
        return $this->role === 'eleve';
    }

    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }
}
