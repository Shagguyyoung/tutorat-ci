<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Profile extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'user_id', 'nom', 'prenom', 'telephone',
        'photo_url', 'bio', 'quartier', 'ville',
        'tarif_heure', 'matieres', 'niveaux',
        'note_moyenne', 'nb_avis', 'nb_seances', 'disponible',
    ];

    protected $casts = [
        'matieres'     => 'array',
        'niveaux'      => 'array',
        'note_moyenne' => 'float',
        'disponible'   => 'boolean',
        'tarif_heure'  => 'integer',
    ];

    // ── Relations ────────────────────────────────────────────

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function sessionsTuteur(): HasMany
    {
        return $this->hasMany(SessionTutorat::class, 'tuteur_id');
    }

    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class, 'tuteur_id');
    }

    // ── Scopes de recherche ───────────────────────────────────

    /** Filtrer par matière */
    public function scopeMatiere(Builder $query, string $matiere): Builder
    {
        return $query->whereJsonContains('matieres', $matiere);
    }

    /** Filtrer par quartier */
    public function scopeQuartier(Builder $query, string $quartier): Builder
    {
        return $query->where('quartier', 'like', "%{$quartier}%");
    }

    /** Filtrer par fourchette de tarif */
    public function scopeTarif(Builder $query, int $min, int $max): Builder
    {
        return $query->whereBetween('tarif_heure', [$min, $max]);
    }

    /** Tuteurs disponibles uniquement */
    public function scopeDisponible(Builder $query): Builder
    {
        return $query->where('disponible', true);
    }

    /** Trier par note */
    public function scopeMeilleursNotes(Builder $query): Builder
    {
        return $query->orderByDesc('note_moyenne');
    }

    // ── Helpers ───────────────────────────────────────────────

    public function getNomCompletAttribute(): string
    {
        return "{$this->prenom} {$this->nom}";
    }

    /** Recalcule et sauvegarde la note moyenne */
    public function recalculerNote(): void
    {
        $this->nb_avis      = $this->reviews()->where('visible', true)->count();
        $this->note_moyenne = $this->reviews()->where('visible', true)->avg('note') ?? 0;
        $this->save();
    }
}
